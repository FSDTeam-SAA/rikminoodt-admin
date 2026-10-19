"use client"

import * as React from "react"
import { Pencil, ChevronDown, Check, Camera, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { AdminProfile } from "../types"
import { useProfile, useUpdateProfile, useUploadAvatar } from "../hooks"

const languages = ["English", "Dutch", "German", "French", "Spanish"]

export function PersonalInformationForm() {
  const { data: profile, isLoading } = useProfile()
  const updateProfileMutation = useUpdateProfile()
  const uploadAvatarMutation = useUploadAvatar()

  const [formData, setFormData] = React.useState<AdminProfile>({
    firstName: "Rik",
    lastName: "minoodt",
    email: "admin@boekerello.com",
    language: "English",
    phone: "",
    avatar: "",
  })

  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [languageDropdownOpen, setLanguageDropdownOpen] = React.useState(false)
  const languageDropdownRef = React.useRef<HTMLDivElement>(null)

  // Sync loaded profile into form state
  React.useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        language: profile.language || "English",
        phone: profile.phone || "",
        avatar: profile.avatar || "",
      })
    }
  }, [profile])

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

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type", {
        description: "Please select an image file (PNG, JPG, WebP).",
      })
      return
    }

    uploadAvatarMutation.mutate(file, {
      onSuccess: (newUrl) => {
        toast.success("Avatar Updated", {
          description: "Your profile picture has been updated successfully.",
        })
        if (newUrl) {
          setFormData((prev) => ({ ...prev, avatar: newUrl }))
        }
      },
      onError: (err: any) => {
        toast.error("Failed to upload avatar", {
          description: err.response?.data?.message || err.message || "Something went wrong",
        })
      },
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.firstName.trim()) {
      toast.error("First name required", {
        description: "Please enter your first name.",
      })
      return
    }

    updateProfileMutation.mutate(
      {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        language: formData.language,
        phone: formData.phone?.trim() || undefined,
      },
      {
        onSuccess: () => {
          toast.success("Profile Updated", {
            description: "Your personal information has been saved successfully.",
          })
        },
        onError: (err: any) => {
          toast.error("Failed to update profile", {
            description:
              err.response?.data?.message ||
              err.message ||
              "Could not save profile changes.",
          })
        },
      }
    )
  }

  return (
    <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-[0px_1px_3px_0px_rgba(228,234,248,0.7)] flex flex-col font-['Nunito_Sans'] overflow-hidden">
      {/* Card Header matching Figma snippet */}
      <div className="w-full p-6 border-b border-slate-200/80 flex items-center justify-between">
        <h2 className="text-gray-900 text-2xl font-medium">
          Personal Information
        </h2>
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E88DA0]" />
            Loading profile...
          </div>
        )}
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
        {/* Profile Avatar Upload Section */}
        <div className="flex items-center gap-5 pb-2 border-b border-slate-100">
          <div className="relative group">
            <img
              src={
                formData.avatar ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              }
              alt="Admin Avatar"
              className="w-20 h-20 rounded-full object-cover border-2 border-[#E88DA0]/30 shadow-xs group-hover:opacity-90 transition-opacity"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadAvatarMutation.isPending}
              className="absolute bottom-0 right-0 w-7 h-7 bg-[#E88DA0] hover:bg-[#DE778C] text-white rounded-full flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-105 disabled:opacity-50"
              title="Change avatar"
            >
              {uploadAvatarMutation.isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Camera className="w-3.5 h-3.5" />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarFileChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                {formData.firstName} {formData.lastName}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E88DA0]/10 text-[#E88DA0]">
                Admin
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Click the camera icon to upload a new profile picture (JPG, PNG or WebP)
            </p>
          </div>
        </div>

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

          {/* Email Address Field (Read-only as backend user identity) */}
          <div className="flex flex-col gap-2.5">
            <label className="text-stone-900 text-base font-medium flex items-center justify-between">
              <span>Email Address</span>
              <span className="text-xs text-slate-400 font-normal">Account login</span>
            </label>
            <div className="w-full h-12 px-3.5 py-2 bg-slate-100/70 rounded-lg border border-slate-200/80 flex items-center justify-between cursor-not-allowed">
              <input
                type="email"
                value={formData.email}
                disabled
                className="flex-1 bg-transparent text-gray-600 text-base font-normal outline-none cursor-not-allowed"
              />
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

          {/* Phone Field */}
          <div className="flex flex-col gap-2.5 md:col-span-2">
            <label className="text-stone-900 text-base font-medium flex items-center justify-between">
              <span>Phone Number</span>
              <span className="text-xs text-slate-400 font-normal">Optional</span>
            </label>
            <div className="w-full h-12 px-3.5 py-2 bg-teal-700/5 rounded-lg border border-slate-200/80 focus-within:border-[#E88DA0] focus-within:ring-2 focus-within:ring-[#E88DA0]/20 flex items-center justify-between transition-all">
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="flex-1 bg-transparent text-gray-900 text-base font-normal outline-none"
              />
              <Pencil className="w-4 h-4 text-slate-700 shrink-0 ml-2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Card Footer with Save Changes Button */}
        <div className="pt-6 border-t border-slate-200/80 flex items-center justify-start">
          <button
            type="submit"
            disabled={updateProfileMutation.isPending}
            className="w-full sm:w-80 h-12 px-4 py-3 bg-[#E88DA0] hover:bg-[#DE778C] text-white text-lg font-semibold rounded-lg border-l-2 border-[#E88DA0] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.99] disabled:opacity-50"
          >
            {updateProfileMutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PersonalInformationForm
