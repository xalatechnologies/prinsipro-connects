import React from 'react';
import { motion } from 'framer-motion';
import type { Area, Stats } from '@/types';
import { AreaCard } from './AreaCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AreaOverviewProps {
  areas: Area[];
  onAreaSelect: (areaId: string) => void;
  onAreaCreate?: () => void;
  onAreaEdit?: (area: Area) => void;
  onAreaDelete?: (areaId: string) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function AreaOverview({ 
  areas, 
  onAreaSelect,
  onAreaCreate,
  onAreaEdit,
  onAreaDelete 
}: AreaOverviewProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className="bg-white rounded-xl shadow-lg p-8 sm:p-10"
    >
      <motion.div variants={item} className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Velkommen til Arkitekturprinsipper</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Her finner du en samling av arkitekturprinsipper, metoder og rutiner for sikkerhet, 
          skyløsninger, AI-integrasjoner og utviklingspraksis.
        </p>
        {isAdmin && onAreaCreate && (
          <Button
            onClick={onAreaCreate}
            className="mt-6 bg-[#003057] hover:bg-[#002543]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Legg til nytt område
          </Button>
        )}
      </motion.div>
      
      <motion.div 
        variants={container}
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {areas.map((area) => (
          <AreaCard
            key={area.id}
            area={area}
            onSelect={() => onAreaSelect(area.id)}
            onEdit={isAdmin && onAreaEdit ? () => onAreaEdit(area) : undefined}
            onDelete={isAdmin && onAreaDelete ? () => onAreaDelete(area.id) : undefined}
            stats={{
              likes: area.stats?.likes || 0,
              comments: area.stats?.comments || 0
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}