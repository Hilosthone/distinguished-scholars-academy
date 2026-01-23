import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export const downloadPDF = (
  userScore: number,
  quizData: any[],
  correctCount: number,
  secondsUsed: number,
  subjectStats: any[],
) => {
  const doc = new jsPDF()

  const addWatermark = (pdf: any) => {
    const totalPages = pdf.internal.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i)
      pdf.saveGraphicsState()
      pdf.setGState(new (pdf as any).GState({ opacity: 0.15 }))
      pdf.setFontSize(35)
      pdf.setTextColor(150)
      pdf.text('Distinguished Scholars Academy', 40, 190, { angle: 45 })
      pdf.restoreGraphicsState()
    }
  }

  // Header & Branding
  doc.addImage('/imges/DSA.jpg', 'JPEG', 92.5, 10, 25, 25)
  doc.setFontSize(20)
  doc.setTextColor(0, 46, 255)
  doc.text('Distinguished Scholars Academy', 105, 45, { align: 'center' })

  doc.setFontSize(12)
  doc.setTextColor(100)
  doc.text('Examination Result Report', 105, 52, { align: 'center' })

  // Main Performance Table
  autoTable(doc, {
    startY: 60,
    head: [['Metric', 'Value']],
    body: [
      ['Overall Score', `${userScore}%`],
      ['Total Questions', quizData.length.toString()],
      ['Correct Answers', correctCount.toString()],
      ['Time Taken', `${Math.floor(secondsUsed / 60)}m ${secondsUsed % 60}s`],
    ],
    headStyles: { fillColor: [0, 46, 255] },
    didDrawPage: () => addWatermark(doc),
  })

  // Subject Breakdown Table
  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 10,
    head: [['Subject', 'Score', 'Total', 'Percentage']],
    body: subjectStats.map((s) => [
      s.name,
      s.correct,
      s.total,
      `${s.percent}%`,
    ]),
    headStyles: { fillColor: [31, 41, 55] },
  })

  doc.save('DSA_Quiz_Result.pdf')
}
