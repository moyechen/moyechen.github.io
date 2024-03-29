import { searchPlugin } from '@vuepress/plugin-search'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { defaultTheme } from '@vuepress/theme-default'
import { sidebarConfig } from './mysidebar.js'



export default {
    theme: defaultTheme({
      sidebar: sidebarConfig,
      navbar: [
        {
          text: 'python',
          link: '/python/',
        },         
        {
          text: 'web',
          link: '/web/',
        },
        {
          text: 'notebook',
          link: '/notebook/',
        },
        {
            text: 'ops',
            link: '/ops/',
          },
          {
            text: 'router',
            link: '/router/',
          },
          {
            text: 'video',
            link: '/video/',
          },                
      ],
    }),
    plugins: [
        searchPlugin({
          // 配置项
        }),
        prismjsPlugin({
          // 配置项
        }),
        mediumZoomPlugin({
          // 配置项
        }),
      ],

  }