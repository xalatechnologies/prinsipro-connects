import React, { useState, useEffect } from 'react';
import { useDataService } from '@hooks/useDataService';
import { GovernanceBoard } from '@/types/governance';
import { Users, Shield, FileText, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export function GovernanceOverview() {
  const [boards, setBoards] = useState<GovernanceBoard[]>([]);
  const [loading, setLoading] = useState(true);
  const dataService = useDataService();

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const board = await dataService.getGovernanceBoard('main');
        if (board) setBoards([board]);
      } catch (error) {
        console.error('Failed to load governance boards:', error);
      } finally {
        setLoading(false);
      }
    };
    loadBoards();
  }, [dataService]);

  const stats = [
    { label: 'Aktive unntak', value: '12', icon: AlertTriangle, color: 'text-yellow-600' },
    { label: 'Godkjente prinsipper', value: '45', icon: Shield, color: 'text-green-600' },
    { label: 'Referanser', value: '23', icon: FileText, color: 'text-blue-600' },
    { label: 'Styremedlemmer', value: '8', icon: Users, color: 'text-purple-600' }
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-8">Laster styringsdata...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Arkitekturstyret</h2>
          
          {boards.map((board) => (
            <div key={board.id} className="space-y-6">
              <p className="text-gray-600">{board.description}</p>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Medlemmer</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {board.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{member.user_id}</p>
                        <p className="text-sm text-gray-500 capitalize">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}