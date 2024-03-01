import { newTestSchemaType } from '@/schemas/new-test';

export const getPagespeedResult = async ({
  url,
  device,
}: newTestSchemaType) => {
  return await fetch(
    `${process.env.PAGESPEEDINSIGHTS_API_ENDPOINT}?category=ACCESSIBILITY&category=BEST_PRACTICES&category=PERFORMANCE&category=SEO&category=PWA&key=${process.env.GOOGLE_CLOUD_API_KEY}&url=${url}&strategy=${device}`
  ).then((res) => res.json());
};

export const getCruxResult = async ({ url, device }: newTestSchemaType) => {
  const formFactor = device === 'mobile' ? 'phone' : device;

  return await fetch(
    `${process.env.CRUX_API_ENDPOINT}?key=${process.env.GOOGLE_CLOUD_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        formFactor,
        metrics: [
          'cumulative_layout_shift',
          'first_contentful_paint',
          'first_input_delay',
          'interaction_to_next_paint',
          'largest_contentful_paint',
          'experimental_time_to_first_byte',
        ],
      }),
    }
  ).then((res) => res.json());
};
