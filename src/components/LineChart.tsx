'use client';

import React from 'react';
import { colors } from '@/design-system';

interface DataPoint {
  month: string;
  aktif: number;
  selesai: number;
}

interface LineChartProps {
  data: DataPoint[];
  height?: number;
  className?: string;
}

export default function LineChart({ data, height = 320, className = "" }: LineChartProps) {
  const maxValue = Math.max(...data.flatMap(d => [d.aktif, d.selesai]));
  const chartHeight = height - 60; // Leave space for labels
  
  // Generate SVG path for a line
  const generatePath = (dataKey: 'aktif' | 'selesai') => {
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((item[dataKey] / maxValue) * 100);
      return `${x},${y}`;
    }).join(' ');
    
    return `M ${points}`;
  };

  const getColor = (type: 'aktif' | 'selesai') => {
    return type === 'aktif' ? colors.primary[500] : colors.base[700];
  };

  return (
    <div className={`w-full ${className}`} style={{ height: `${height}px` }}>
      {/* Legend */}
      <div className="flex items-center mb-4 space-x-6">
        <div className="flex items-center space-x-2">
          <div 
            className="w-3 h-0.5"
            style={{ backgroundColor: colors.primary[500] }}
          ></div>
          <span className="text-sm" style={{ color: colors.base[600] }}>
            Kontrak Aktif
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div 
            className="w-3 h-0.5"
            style={{ backgroundColor: colors.base[700] }}
          ></div>
          <span className="text-sm" style={{ color: colors.base[600] }}>
            Kontrak Selesai
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative w-full" style={{ height: `${chartHeight}px` }}>
        <svg 
          className="w-full h-full" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          style={{ overflow: 'visible' }}
        >
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke={colors.base[200]}
              strokeWidth="0.2"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          
          {/* Lines */}
          <path
            d={generatePath('aktif')}
            fill="none"
            stroke={getColor('aktif')}
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={generatePath('selesai')}
            fill="none"
            stroke={getColor('selesai')}
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />
          
          {/* Data points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const yAktif = 100 - ((item.aktif / maxValue) * 100);
            const ySelesai = 100 - ((item.selesai / maxValue) * 100);
            
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={yAktif}
                  r="1.2"
                  fill={getColor('aktif')}
                  vectorEffect="non-scaling-stroke"
                />
                <circle
                  cx={x}
                  cy={ySelesai}
                  r="1.2"
                  fill={getColor('selesai')}
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            );
          })}
        </svg>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs" style={{ color: colors.base[500], transform: 'translateX(-100%)' }}>
          <span>{maxValue}</span>
          <span>{Math.round(maxValue * 0.75)}</span>
          <span>{Math.round(maxValue * 0.5)}</span>
          <span>{Math.round(maxValue * 0.25)}</span>
          <span>0</span>
        </div>
      </div>
      
      {/* X-axis labels */}
      <div className="flex justify-between mt-2 text-xs" style={{ color: colors.base[500] }}>
        {data.map((item) => (
          <span key={item.month}>{item.month}</span>
        ))}
      </div>
    </div>
  );
}