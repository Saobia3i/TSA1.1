import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
//     https://www.instagram.com/tensor_security_academy/

// https://www.linkedin.com/company/tensorsecurityacademy/

// https://x.com/Tensor_Security


// contact@tensorsecurityacademy.com

    {
      url: 'https://www.tensorsecurityacademy.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://www.tensorsecurityacademy.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.tensorsecurityacademy.com/courses',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.tensorsecurityacademy.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // add rest of the pages
  ]
}
