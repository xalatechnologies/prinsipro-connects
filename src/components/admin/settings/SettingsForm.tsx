import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

interface SettingsFormProps {
  onSave: () => void;
}

export function SettingsForm({ onSave }: SettingsFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
    toast({
      title: 'Innstillinger lagret',
      description: 'Endringene ble lagret.'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* General Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Generelle innstillinger</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organisasjonsnavn
            </label>
            <input
              type="text"
              className={cn(
                "w-full px-4 py-2 rounded-lg",
                "border border-gray-300",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              )}
              defaultValue="Nordre Follo kommune"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Domene
            </label>
            <input
              type="text"
              className={cn(
                "w-full px-4 py-2 rounded-lg",
                "border border-gray-300",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              )}
              defaultValue="nordrefollo.kommune.no"
            />
          </div>
        </div>
      </div>

      {/* Email Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">E-postinnstillinger</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Varslings-e-post
            </label>
            <input
              type="email"
              className={cn(
                "w-full px-4 py-2 rounded-lg",
                "border border-gray-300",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              )}
              defaultValue="varsling@nordrefollo.kommune.no"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-postformat
            </label>
            <select
              className={cn(
                "w-full px-4 py-2 rounded-lg",
                "border border-gray-300",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                "bg-white"
              )}
              defaultValue="html"
            >
              <option value="html">HTML</option>
              <option value="text">Ren tekst</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Varslingsinnstillinger</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">E-postvarsler</h3>
              <p className="text-sm text-gray-500">Motta varsler på e-post</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className={cn(
                "w-11 h-6 bg-gray-200 rounded-full peer",
                "peer-checked:after:translate-x-full peer-checked:after:border-white",
                "after:content-[''] after:absolute after:top-0.5 after:left-[2px]",
                "after:bg-white after:border-gray-300 after:border after:rounded-full",
                "after:h-5 after:w-5 after:transition-all",
                "peer-checked:bg-[#003057]"
              )}></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Systemvarsler</h3>
              <p className="text-sm text-gray-500">Vis varsler i systemet</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className={cn(
                "w-11 h-6 bg-gray-200 rounded-full peer",
                "peer-checked:after:translate-x-full peer-checked:after:border-white",
                "after:content-[''] after:absolute after:top-0.5 after:left-[2px]",
                "after:bg-white after:border-gray-300 after:border after:rounded-full",
                "after:h-5 after:w-5 after:transition-all",
                "peer-checked:bg-[#003057]"
              )}></div>
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6">
        <Button type="submit">
          Lagre innstillinger
        </Button>
      </div>
    </form>
  );
}