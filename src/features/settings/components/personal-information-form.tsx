"use client"

import * as React from "react"
import { Pencil, ChevronDown, Check } from "lucide-react"
import { toast } from "sonner"
import { AdminProfile } from "../types"

const languages = ["English", "Dutch", "German", "French", "Spanish"]

export function PersonalInformationForm() {
  const [formData, setFormData] = React.useState<AdminProfile>({
    firstName: "Rik",
    lastName: "minoodt",
    email: "admin1@gmail.com",
    language: "English",
  })

  const [languageDropdownOpen, setLanguageDropdownOpen] = React.useState(false)
  const languageDropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setLanguageDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleChange = (field: keyof AdminProfile, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Profile Updated", {
      description: "Your personal information has been saved successfully.",
    })
  }

  return (
    <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-[0px_1px_3px_0px_rgba(228,234,248,0.7)] flex flex-col font-['Nunito_Sans'] overflow-hidden">
      {/* Card Header matching snippet */}
      <div className="w-full p-6 border-b border-slate-200/80 flex items-center justify-between">
        <h2 className="text-gray-900 text-2xl font-medium">
          Personal Information
        </h2>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name Field */}
          <div className="flex flex-col gap-2.5">
            <label className="text-stone-900 text-base font-medium">
              First Name
            </label>
            <div className="w-full h-12 px-3.5 py-2 bg-teal-700/5 rounded-lg border border-slate-200/80 focus-within:border-[#E88DA0] focus-within:ring-2 focus-within:ring-[#E88DA0]/20 flex items-center justify-between transition-all">
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="flex-1 bg-transparent text-gray-900 text-base font-normal outline-none"
              />
              <Pencil className="w-4 h-4 text-slate-700 shrink-0 ml-2 pointer-events-none" />
            </div>
          </div>

          {/* Last Name Field */}
          <div className="flex flex-col gap-2.5">
            <label className="text-stone-900 text-base font-medium">
              Last Name
            </label>
            <div className="w-full h-12 px-3.5 py-2 bg-teal-700/5 rounded-lg border border-slate-200/80 focus-within:border-[#E88DA0] focus-within:ring-2 focus-within:ring-[#E88DA0]/20 flex items-center justify-between transition-all">
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="flex-1 bg-transparent text-gray-900 text-base font-normal outline-none"
              />
              <Pencil className="w-4 h-4 text-slate-700 shrink-0 ml-2 pointer-events-none" />
            </div>
          </div>

          {/* Email Address Field */}
          <div className="flex flex-col gap-2.5">
            <label className="text-stone-900 text-base font-medium">
              Email Address
            </label>
            <div className="w-full h-12 px-3.5 py-2 bg-teal-700/5 rounded-lg border border-slate-200/80 focus-within:border-[#E88DA0] focus-within:ring-2 focus-within:ring-[#E88DA0]/20 flex items-center justify-between transition-all">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="flex-1 bg-transparent text-gray-900 text-base font-normal outline-none"
              />
              <Pencil className="w-4 h-4 text-slate-700 shrink-0 ml-2 pointer-events-none" />
            </div>
          </div>

          {/* Language Field */}
          <div className="flex flex-col gap-2.5">
            <label className="text-stone-900 text-base font-medium">
              Language
            </label>
            <div ref={languageDropdownRef} className="relative w-full">
              <button
                type="button"
                onClick={() => setLanguageDropdownOpen((p) => !p)}
                className="w-full h-12 px-3.5 py-2 bg-teal-700/5 rounded-lg border border-slate-200/80 hover:border-slate-300 focus:border-[#E88DA0] flex items-center justify-between transition-all cursor-pointer text-base"
              >
                <span className="text-gray-900 font-normal">
                  {formData.language}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-700 shrink-0 ml-2 transition-transform ${
                    languageDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {languageDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-xl shadow-lg border border-slate-200 p-1.5 z-30 flex flex-col gap-1">
                  {languages.map((lang) => {
                    const isSelected = formData.language === lang
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => {
                          handleChange("language", lang)
                          setLanguageDropdownOpen(false)
                        }}
                        className={`w-full px-3 py-2 text-left text-sm rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-[#E88DA0] text-white font-semibold"
                            : "text-gray-700 hover:bg-slate-50 hover:text-gray-900"
                        }`}
                      >
                        <span>{lang}</span>
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card Footer with Save Changes Button */}
        <div className="pt-6 border-t border-slate-200/80 flex items-center justify-start">
          <button
            type="submit"
            className="w-full sm:w-80 h-12 px-4 py-3 bg-[#E88DA0] hover:bg-[#DE778C] text-white text-lg font-semibold rounded-lg border-l-2 border-[#E88DA0] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-[0.99]"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default PersonalInformationForm
