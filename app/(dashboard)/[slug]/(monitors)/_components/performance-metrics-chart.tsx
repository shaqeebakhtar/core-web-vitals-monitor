import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AccessibilityChart from './accessibility-chart';
import FcpChart from './metrics-charts/fcp-chart';
import LcpChart from './metrics-charts/lcp-chart';
import TbtChart from './metrics-charts/tbt-chart';
import ClsChart from './metrics-charts/cls-chart';
import SiChart from './metrics-charts/si-chart';

const PerformanceMetricsChart = () => {
  return (
    <div className="p-4 md:p-6 border rounded-md bg-white space-y-6">
      <div className="space-y-0">
        <h3 className="font-semibold text-xl">Performance Metrics</h3>
        <p className="text-sm text-gray-500">
          Analyze each metrics individually that contributes to the performance
          Score
        </p>
      </div>
      <Tabs
        defaultValue="fcp"
        className="flex flex-col gap-6 md:flex-row md:gap-8"
      >
        <TabsList className="flex flex-col h-full gap-2">
          <TabsTrigger value="fcp" className="w-full justify-start">
            First Contentful Paint
          </TabsTrigger>
          <TabsTrigger value="lcp" className="w-full justify-start">
            Largest Contentful Paint
          </TabsTrigger>
          <TabsTrigger value="tbt" className="w-full justify-start">
            Total Blocking Time
          </TabsTrigger>
          <TabsTrigger value="cls" className="w-full justify-start">
            Cumulative Layout Shift
          </TabsTrigger>
          <TabsTrigger value="si" className="w-full justify-start">
            Speed Index
          </TabsTrigger>
        </TabsList>
        <TabsContent value="fcp" className="w-full">
          <FcpChart />
        </TabsContent>
        <TabsContent value="lcp" className="w-full">
          <LcpChart />
        </TabsContent>
        <TabsContent value="tbt" className="w-full">
          <TbtChart />
        </TabsContent>
        <TabsContent value="cls" className="w-full">
          <ClsChart />
        </TabsContent>
        <TabsContent value="si" className="w-full">
          <SiChart />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceMetricsChart;
