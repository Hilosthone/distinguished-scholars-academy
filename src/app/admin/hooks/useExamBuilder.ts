'use client'

import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import { Question, QuizConfig } from '../constants/quiz'

export const useExamBuilder = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [questions, setQuestions] = useState<Question[]>([])
  const [isDeploying, setIsDeploying] = useState(false)
  const [config, setConfig] = useState<QuizConfig>({
    title: '',
    description: '',
    timeLimit: 30,
    shuffleQuestions: false,
    showLeaderboard: true,
    accessCode: '',
    category: 'General',
  })

  // --- IMAGE PROCESSING ---
  const handleImageUpload = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  // --- BULK EXCEL IMPORT ---
  const importFromExcel = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: 'array' })
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const rows = XLSX.utils.sheet_to_json(sheet) as any[]

      const parsedQuestions: Question[] = rows.map((row, i) => ({
        id: crypto.randomUUID(),
        subject: row.Subject || 'General',
        topic: row.Topic || '',
        body: row.Question || row.Body || '',
        options: {
          A: String(row.A || ''),
          B: String(row.B || ''),
          C: String(row.C || ''),
          D: String(row.D || ''),
          E: String(row.E || ''),
        },
        correctOption: String(row.Answer || 'A').toUpperCase(),
        explanation: row.Explanation || '',
        image: null,
        mark: Number(row.Mark) || 1,
      }))

      setQuestions((prev) => [...prev, ...parsedQuestions])
    }
    reader.readAsArrayBuffer(file)
  }

  // --- API DEPLOYMENT LOGIC ---
  const deployToBackend = async () => {
    setIsDeploying(true)

    // Transform flat questions into the "Nested Subjects" format
    const subjectsMap = questions.reduce(
      (acc, q) => {
        if (!acc[q.subject]) {
          acc[q.subject] = { name: q.subject, questions: [] }
        }

        acc[q.subject].questions.push({
          text: q.body,
          options: [
            q.options.A,
            q.options.B,
            q.options.C,
            q.options.D,
            q.options.E,
          ].filter((opt) => opt !== undefined && opt !== ''),
          correctAnswer: q.options[q.correctOption as keyof typeof q.options],
          explanation: q.explanation,
          image: q.image, // Base64 string
          points: q.mark,
        })
        return acc
      },
      {} as Record<string, any>,
    )

    const payload = {
      title: config.title,
      description: config.description,
      timeLimit: config.timeLimit,
      accessCode: config.accessCode,
      subjects: Object.values(subjectsMap),
      // Adding metadata for your specific dashboard
      metadata: {
        totalQuestions: questions.length,
        shuffle: config.shuffleQuestions,
        hasLeaderboard: config.showLeaderboard,
      },
    }

    try {
      const res = await fetch(
        'https://taxlator-backend.onrender.com/api/quizzes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('dsa_token')}`,
          },
          body: JSON.stringify(payload),
        },
      )

      if (!res.ok) throw new Error('Deployment failed')
      return await res.json()
    } catch (err) {
      console.error('Deploy Error:', err)
      throw err
    } finally {
      setIsDeploying(false)
    }
  }

  return {
    step,
    setStep,
    questions,
    setQuestions,
    config,
    setConfig,
    isDeploying,
    importFromExcel,
    handleImageUpload,
    deployToBackend,
  }
}
