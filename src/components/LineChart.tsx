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
    const pathCommands = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((item[dataKey] / maxValue) * 100);
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    });
    
    return pathCommands.join(' ');
  };

  return (
    <div className={`w-full ${className}`} style={{ height: `${height}px` }}>
      {/* Legend */}
      <div className="flex items-center mb-6 space-x-6">
        <div className="flex items-center space-x-2">
          <div 
            className="w-4 h-0.5 rounded-full"
            style={{ backgroundColor: colors.primary[500] }}
          ></div>
          <span className="text-sm" style={{ color: colors.base[600] }}>
            Kontrak Aktif
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div 
            className="w-4 h-0.5 rounded-full"
            style={{ backgroundColor: colors.base[700] }}
          ></div>
          <span className="text-sm" style={{ color: colors.base[600] }}>
            Kontrak Selesai
          </span>
        </div>
      </div>

      {/* Chart Container with Gray Background */}
      <div className="rounded-lg p-4" style={{ height: `${chartHeight + 40}px` }}>
        <div className="relative w-full h-full">
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
              stroke={colors.primary[500]}
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={generatePath('selesai')}
              fill="none"
              stroke={colors.base[700]}
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          
          {/* Data points - positioned absolutely to avoid stretching */}
          {data.map((item, index) => {
            const xPercent = (index / (data.length - 1)) * 100;
            const yAktifPercent = 100 - ((item.aktif / maxValue) * 100);
            const ySelesaiPercent = 100 - ((item.selesai / maxValue) * 100);
            
            return (
              <div key={index}>
                <div
                  className="absolute w-2 h-2 rounded-full transform -translate-x-1 -translate-y-1"
                  style={{
                    backgroundColor: colors.primary[500],
                    left: `${xPercent}%`,
                    top: `${yAktifPercent}%`,
                  }}
                />
                <div
                  className="absolute w-2 h-2 rounded-full transform -translate-x-1 -translate-y-1"
                  style={{
                    backgroundColor: colors.base[700],
                    left: `${xPercent}%`,
                    top: `${ySelesaiPercent}%`,
                  }}
                />
              </div>
            );
          })}
          
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs" style={{ color: colors.base[500], transform: 'translateX(-100%) translateY(10px)' }}>
            <span>{maxValue}</span>
            <span>{Math.round(maxValue * 0.75)}</span>
            <span>{Math.round(maxValue * 0.5)}</span>
            <span>{Math.round(maxValue * 0.25)}</span>
            <span>0</span>
          </div>
          
          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs" style={{ color: colors.base[500], transform: 'translateY(100%)' }}>
            {data.map((item) => (
              <span key={item.month}>{item.month}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}