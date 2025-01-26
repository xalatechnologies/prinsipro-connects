import React from 'react';
import { motion } from 'framer-motion';
import { Area } from '../types';
import { ChevronRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { STATUS_ICONS } from '../config/constants';

interface AreaDetailProps {
  area: Area;
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

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'fullført':
      return <CheckCircle2 className={`h-5 w-5 ${STATUS_ICONS[status].color}`} />;
    case 'pågående':
      return <Clock className={`h-5 w-5 ${STATUS_ICONS[status].color}`} />;
    default:
      return <AlertCircle className={`h-5 w-5 ${STATUS_ICONS[status].color}`} />;
  }
};

export function AreaDetail({ area }: AreaDetailProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="space-y-12"
    >
      <motion.div variants={item} className="border-b border-gray-200 pb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">{area.name}</h2>
        <p className="text-xl text-gray-600 mb-6">{area.description}</p>
        <div className="flex items-center gap-2 text-base text-gray-500">
          <span className="font-medium">Faglig ansvarlig:</span>
          <span>{area.responsible}</span>
        </div>
      </motion.div>

      <motion.div variants={container} className="grid gap-12">
        {area.categories.map((category) => (
          <motion.div
            key={category.id}
            variants={item}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">{category.name}</h3>
              <p className="text-lg text-gray-600">{category.description}</p>
            </div>

            <div className="divide-y divide-gray-200">
              {category.principles.map((principle) => (
                <motion.div
                  key={principle.id}
                  variants={item}
                  className="px-8 py-6"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h4 className="text-xl font-medium text-gray-900 mb-3">{principle.title}</h4>
                      <p className="text-lg text-gray-600">{principle.description}</p>
                    </div>
                  </div>

                  {principle.measures.length > 0 && (
                    <motion.div
                      variants={container}
                      className="mt-6 bg-gray-50 rounded-xl p-6"
                    >
                      <h5 className="text-base font-medium text-gray-900 mb-4">Tiltak og status</h5>
                      <div className="space-y-4">
                        {principle.measures.map((measure) => (
                          <motion.div
                            key={measure.id}
                            variants={item}
                            whileHover={{ scale: 1.01 }}
                            className="flex items-start gap-6 bg-white p-6 rounded-xl border border-gray-200 transition-shadow hover:shadow-md"
                          >
                            <div className="flex-shrink-0 mt-1">
                              {getStatusIcon(measure.status)}
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-center gap-3 mb-2">
                                <h6 className="text-lg font-medium text-gray-900">{measure.title}</h6>
                                <span className={`text-sm px-3 py-1 rounded-full border ${STATUS_ICONS[measure.status].badgeColor}`}>
                                  {measure.status}
                                </span>
                              </div>
                              <p className="text-base text-gray-600 mb-3">{measure.description}</p>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span className="font-medium">Ansvarlig:</span>
                                <span>{measure.responsible}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}