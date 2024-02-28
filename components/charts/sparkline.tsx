'use client';
import React, { HTMLAttributes, useId, useMemo } from 'react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

export type AreaChartCurveType =
  | 'bump'
  | 'linear'
  | 'natural'
  | 'monotone'
  | 'step'
  | 'stepBefore'
  | 'stepAfter';

export interface SparklineProps extends HTMLAttributes<HTMLDivElement> {
  data: (number | null)[];
  color?: string;
  withGradient?: boolean;
  fillOpacity?: number;
  curveType?: AreaChartCurveType;
  strokeWidth?: number;
}

const Sparkline = React.forwardRef<HTMLDivElement, SparklineProps>(
  (
    {
      className,
      data,
      color = 'hsl(var(--primary))',
      withGradient = true,
      fillOpacity = 0.6,
      strokeWidth = 2,
      curveType = 'linear',
      ...props
    },
    ref
  ) => {
    const id = useId();
    const mappedData = useMemo(
      () => data.map((value, index) => ({ value, index })),
      [data]
    );

    return (
      <div dir="ltr" className={className} ref={ref} {...props}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mappedData}>
            <Area
              dataKey="value"
              type={curveType}
              fill={`url(#${id})`}
              stroke={color}
              isAnimationActive={false}
              connectNulls
              strokeWidth={strokeWidth}
              fillOpacity={1}
            />
            <defs>
              <AreaGradient
                id={id}
                color={color}
                fillOpacity={fillOpacity}
                withGradient={withGradient}
              />
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
);

Sparkline.displayName = 'Sparkline';

export { Sparkline };

interface AreaGradientProps {
  color: string;
  id: string;
  withGradient: boolean | undefined;
  fillOpacity: number | undefined;
}

export function AreaGradient({
  color,
  id,
  withGradient,
  fillOpacity,
}: AreaGradientProps) {
  return (
    <>
      {withGradient ? (
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={fillOpacity} />
          <stop offset="100%" stopColor={color} stopOpacity={0.01} />
        </linearGradient>
      ) : (
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={color} stopOpacity={fillOpacity ?? 0.2} />
        </linearGradient>
      )}
    </>
  );
}

AreaGradient.displayName = 'AreaGradient';
