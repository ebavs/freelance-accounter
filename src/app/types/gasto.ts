import { Cliente } from './cliente';
import { Worker } from './worker';

export class Gasto {
    id: number;
    cliente: Cliente;
    concepto: string;
    numero: string;
    fecha: Date;
    importe: number;
    iva: number;
    notas: string;
    recurrente: boolean;
    recurrenteHasta: Date;
    importeFactura: number;
    importeIVA: number;
    facturaPara: Worker;
}
