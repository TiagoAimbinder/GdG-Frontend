import { Component, OnInit } from '@angular/core';
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
    public localType: string = 'Local';
    public localId: number | null = null; // Corrección aquí

    constructor(private UnitsSoldService: UnitsSoldService) { }

    ngOnInit(): void {
        this._getAllCategories();
        this.localId = this.localType === 'Local' ? null : this.localType === 'Eddie Costa' ? 1 : 2;
        this.getTotalsSaleHistory(this.localId);
    }

    public _formatDate(fecha: string) {
        const date = new Date(fecha);
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '/');
    }

private getTotalsSaleHistory = async (sal_local: number | null) => {
    const usu_id = Number(localStorage.getItem('usu_id'));
    (await this.UnitsSoldService.unitsSoldGetTotals(usu_id, sal_local)).subscribe({
        next: (data) => {
            console.log('Respuesta de la API:', data); // Verifica la respuesta
            this.saleHistoryTotals = data.totals;
            this.saleHistory = data.sales;
            this.tableFilterLocal(this.localType);
        },
        error: (err) => {
            console.error('Error fetching totals:', err);
            this.saleHistoryTotals = [];
            this.saleHistory = [];
            this.saleHistoryFiltered = [];
        }
    });
}

    private _getAllCategories = async () => {
        const usu_id = Number(localStorage.getItem('usu_id'));
        (await this.UnitsSoldService.unitsSoldGetAll(usu_id)).subscribe({
            next: (data) => {
                console.log('Datos recibidos:', data);
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

    isSaleHistoryTotalsEmpty(): boolean {
        return Object.keys(this.saleHistoryTotals).length > 0;
    }

    public tableFilterLocal(mt: string) {
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
        this.recalculateTotalsAndAverages();
    }

    public filterLocal(mt: string) {
        mt === 'Local' ? this.localType = 'Eddie Costa' : mt === 'Eddie Costa' ? this.localType = 'Eddie Centro' : this.localType = 'Local';
    }

    public onFilterLocal() { // Corrección aquí
        this.filterLocal(this.localType);
        this.tableFilterLocal(this.localType);
        this.getTotalsSaleHistory(this.localId);
    }

    public recalculateTotalsAndAverages() {
        const filteredData = this.saleHistoryFiltered;
        let totalMensual = 0;
        let totalSemanal = 0;
        let count = 0;
        filteredData.forEach((item: any) => {
            const date = new Date(item.sal_date);
            const today = new Date();
            if (date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
                totalMensual += item.sal_quantity;
            }
            const diffTime = today.getTime() - date.getTime();
            const diffDays = diffTime / (1000 * 3600 * 24);
            if (diffDays <= 7) {
                totalSemanal += item.sal_quantity;
            }
            count++;
        });
        const promedioDiarioGeneral = filteredData.length > 0 ? filteredData.reduce((acc, item) => acc + item.sal_quantity, 0) / filteredData.length : 0;
        const promedioDiarioMensual = totalMensual / count;
        const promedioDiarioSemanal = totalSemanal / count;
        this.saleHistoryTotals = {
            total_mensual: totalMensual,
            total_semanal: totalSemanal,
            promedio_diario_general: promedioDiarioGeneral,
            promedio_diario_mensual: promedioDiarioMensual,
            promedio_diario_semanal: promedioDiarioSemanal
        };
    }
}
  