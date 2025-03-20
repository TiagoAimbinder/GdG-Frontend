import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { UnitsSoldService } from 'src/app/core/services/UnitsSoldService/units-sold.service';

@Component({
    selector: 'app-units-sold-history',
    standalone: true,
    imports: [CommonModule, NavbarComponent],
    templateUrl: './units-sold-history.component.html',
    styleUrls: ['./units-sold-history.component.css']
})
export class UnitsSoldHistoryComponent implements OnInit {

    public saleHistoryFiltered: any[] = [];
    public saleHistory: any[] = [];
    public saleHistoryTotals: any = [];
    public localType: any = [
        { value: 1, name: "Eddie Costa"},
        { value: 2, name: "Eddie Centro"},
        ]
    public localId: number | null = null; // Corrección aquí
    public selectedLocal: any = null
    public totals: WritableSignal<any> = signal(null)

    constructor(private UnitsSoldService: UnitsSoldService) { }

    ngOnInit(): void {
        this._getAllCategories();
        this.getTotalsSaleHistory();
    }

    public _formatDate(fecha: string) {
        const date = new Date(fecha);
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '/');
    }

    

    private getTotalsSaleHistory = async (sal_local: number | null = null ) =>{
        const usu_id = Number(localStorage.getItem('usu_id'));

        (await this.UnitsSoldService.unitsSoldGetTotals(usu_id, sal_local)).subscribe({
            next:(res) => {
                this.totals.set(res.totals[0])

            },
            error:() =>{

            }
        })




    }

    private _getAllCategories = async () => {
        const usu_id = Number(localStorage.getItem('usu_id'));
        (await this.UnitsSoldService.unitsSoldGetAll(usu_id)).subscribe({
            next: (data) => {
                this.saleHistory = data.sales;
                this.saleHistoryFiltered = data.sales;
            },
            error: (err) => {
                console.error('Error fetching s:', err);
                this.saleHistory = [];
                this.saleHistoryFiltered = [];
            }
        });
    }


    public tableFilterLocal(mt: string) {

        if (!this.saleHistory || this.saleHistory.length === 0) {
            console.error('Error: saleHistory is undefined or empty');
            return;
        }
        const items = this.saleHistory.filter((item: any) => {
            let isLocalMatch = false;
            if (mt === 'Local') {
                isLocalMatch = (item.sal_local === 1 || item.sal_local === 2);
            } else if (mt === 'Eddie Costa') {
                isLocalMatch = item.sal_local === 1;
            } else if (mt === 'Eddie Centro') {
                isLocalMatch = item.sal_local === 2;
            }
            return isLocalMatch;
        });
        this.saleHistoryFiltered = items;
    }

    public filterLocal(mt: string) {
        mt === 'Local' ? this.localType = 'Eddie Costa' : mt === 'Eddie Costa' ? this.localType = 'Eddie Centro' : this.localType = 'Local';
    }

    public onFilterLocal() { // Corrección aquí
        // this.filterLocal();
        this.getLocal();
        this.tableFilterLocal(this.selectedLocal ? this.selectedLocal.name: "Local");
        this.getTotalsSaleHistory(this.selectedLocal ? this.selectedLocal.value: null);
    }

    public getLocal() {
        if (this.selectedLocal == null){
            return this.selectedLocal = this.localType[0]
        }
        if (this.selectedLocal == this.localType[0]){
            return this.selectedLocal = this.localType[1]
        }
        return this.selectedLocal = null

    }

}
