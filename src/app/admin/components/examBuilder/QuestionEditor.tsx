'use client'
import React, { useRef } from 'react'
import { Plus, ImageIcon, Zap, X, FileSpreadsheet } from 'lucide-react'
import { ImagePreview } from './Shared/ImagePreview'
import { NumberInput } from './Shared/NumberInput'

export const QuestionEditor = ({
  form,
  setForm,
  onSave,
  editingId,
  setEditingId,
  JAMB_SUBJECTS,
  onBulkUpload,
}: any) => {
  const fileRef = useRef<HTMLInputElement>(null)
  const bulkRef = useRef<HTMLInputElement>(null)

  const addOption = () => {
    const keys = Object.keys(form.options).sort()
    const nextKey = String.fromCharCode(65 + keys.length)
    if (keys.length < 6) {
      // Max A-F
      setForm({ ...form, options: { ...form.options, [nextKey]: '' } })
    }
  }

  const removeOption = (key: string) => {
    const newOptions = { ...form.options }
    delete newOptions[key]
    setForm({ ...form, options: newOptions })
  }

  return (
    <div className='bg-white p-6 rounded-3xl shadow-sm border border-slate-200 sticky top-24'>
      <div className='flex justify-between items-center mb-6'>
        <h3 className='font-black text-slate-800 text-[11px] flex items-center gap-2 uppercase tracking-widest'>
          {editingId ? (
            <Zap size={16} className='text-amber-500' />
          ) : (
            <Plus size={16} className='text-indigo-600' />
          )}
          {editingId ? 'Modify Question' : 'New Question'}
        </h3>
        <button
          onClick={() => bulkRef.current?.click()}
          className='text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl flex items-center gap-2'
        >
          <FileSpreadsheet size={14} /> Import
        </button>
        <input
          type='file'
          ref={bulkRef}
          hidden
          onChange={onBulkUpload}
          accept='.xlsx, .xls'
        />
      </div>

      <div className='space-y-4'>
        <div className='grid grid-cols-2 gap-3'>
          <select
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className='p-3 bg-slate-50 border border-slate-200 rounded-xl text-[12px] font-bold outline-none'
          >
            {JAMB_SUBJECTS.map((s: string) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input
            placeholder='Topic (Optional)'
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
            className='p-3 bg-slate-50 border border-slate-200 rounded-xl text-[12px] font-bold outline-none'
          />
        </div>

        <div className='grid grid-cols-2 gap-3'>
          <NumberInput
            label='Marks'
            value={form.mark}
            onChange={(e) => setForm({ ...form, mark: Number(e.target.value) })}
          />
          <div className='flex items-end'>
            <button
              onClick={() => fileRef.current?.click()}
              className={`w-full py-3 border-2 border-dashed rounded-xl text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2 ${form.image ? 'border-indigo-500 text-indigo-600 bg-indigo-50' : 'border-slate-200 text-slate-400'}`}
            >
              <ImageIcon size={14} />{' '}
              {form.image ? 'Change Image' : 'Add Image'}
            </button>
            <input
              type='file'
              ref={fileRef}
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onloadend = () =>
                    setForm({ ...form, image: reader.result as string })
                  reader.readAsDataURL(file)
                }
              }}
              accept='image/*'
            />
          </div>
        </div>

        <ImagePreview
          src={form.image}
          onClear={() => setForm({ ...form, image: null })}
        />

        <textarea
          placeholder='Write the question body here...'
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          className='w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-medium min-h-[100px] outline-none focus:border-indigo-500'
        />

        <div className='space-y-2'>
          {Object.keys(form.options)
            .sort()
            .map((key) => (
              <div
                key={key}
                className={`flex items-center gap-3 p-2 rounded-xl border-2 transition-all ${form.correctOption === key ? 'border-emerald-500 bg-emerald-50' : 'border-slate-50 bg-white'}`}
              >
                <button
                  onClick={() => setForm({ ...form, correctOption: key })}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-black shadow-sm ${form.correctOption === key ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}
                >
                  {key}
                </button>
                <input
                  value={form.options[key]}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      options: { ...form.options, [key]: e.target.value },
                    })
                  }
                  placeholder={`Option ${key}`}
                  className='flex-1 bg-transparent text-[12px] font-bold outline-none'
                />
                {Object.keys(form.options).length > 2 && (
                  <button
                    onClick={() => removeOption(key)}
                    className='p-1 text-slate-300 hover:text-red-500 transition-colors'
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          <button
            onClick={addOption}
            className='w-full py-2 border-2 border-dashed border-slate-100 rounded-xl text-slate-400 text-[10px] font-black uppercase hover:bg-slate-50'
          >
            + Add Consecutive Option
          </button>
        </div>

        <div className='flex gap-2 pt-2'>
          <button
            onClick={onSave}
            className='flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-lg shadow-indigo-100'
          >
            {editingId ? 'Save Changes' : 'Add to Pool'}
          </button>
          {editingId && (
            <button
              onClick={() => setEditingId(null)}
              className='p-4 bg-slate-100 text-slate-500 rounded-2xl'
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
