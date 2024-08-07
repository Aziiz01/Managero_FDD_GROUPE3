import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {

  constructor() { }

  exportMethodeToPDF(methode: any, fileName: string) {
    const element = document.createElement('div');
    element.innerHTML = `
      <div>${methode.introduction}</div>
      <div>${methode.how}</div>
           <div> ${methode.what}</div>
      <div>${methode.whatif}</div>
      <div>${methode.why}</div>
      <div>${methode.conclusion}</div>

    `;
    document.body.appendChild(element);

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(fileName);
      document.body.removeChild(element); // Cleanup
    });
  }
}
