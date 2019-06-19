import { Cliente } from './cliente';
import { Worker } from './worker';

export class Factura {
    id: number;
    cliente: Cliente;
    concepto: string;
    numero: string;
    fecha: Date;
    importe: number;
    vencimiento: number;
    iva: number;
    notas: string;
    importeFactura: number;
    importeIRPF: number;
    importeIVA: number;
    facturadoPor: Worker;
    facturadoPara: Worker;
    internacional: Boolean;
}