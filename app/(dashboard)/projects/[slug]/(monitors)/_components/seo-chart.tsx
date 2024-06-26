'use client';

import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  {
    average: 400,
    today: 240,
  },
  {
    average: 300,
    today: 139,
  },
  {
    average: 200,
    today: 980,
  },
  {
    average: 278,
    today: 390,
  },
  {
    average: 189,
    today: 480,
  },
  {
    average: 239,
    today: 380,
  },
  {
    average: 349,
    today: 430,
  },
];

const SeoChart = () => {
  return (
    <div className="p-4 md:p-6 border rounded-md bg-white space-y-4">
      <div className="space-y-0">
        <h3 className="font-semibold text-xl">SEO</h3>
        <p className="text-sm text-gray-500">SEO score over the duration</p>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Average
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {payload[0].value}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Today
                          </span>
                          <span className="font-bold">{payload[1].value}</span>
                        </div>
                      </div>
                    </div>
                  );
                }

                return null;
              }}
            />
            <Line
              type="linear"
              strokeWidth={2}
              dataKey="average"
              activeDot={{
                r: 6,
                style: { fill: 'hsl(var(--primary))', opacity: 0.25 },
              }}
              style={
                {
                  stroke: 'hsl(var(--primary))',
                  opacity: 0.25,
                } as React.CSSProperties
              }
            />
            <Line
              type="linear"
              dataKey="today"
              strokeWidth={2}
              activeDot={{
                r: 8,
                style: { fill: 'hsl(var(--primary))' },
              }}
              style={
                {
                  stroke: 'hsl(var(--primary))',
                } as React.CSSProperties
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SeoChart;
