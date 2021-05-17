import { createApp } from 'vue'
import CssSelectorBuilder from './CssSelectorBuilder.vue'
import FormConditions from './components/FormConditions.vue'
import './index.css'
import '@fontsource/inconsolata/400.css'
import '@fontsource/shadows-into-light-two/400.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'

createApp(CssSelectorBuilder)
.component('FormConditions', FormConditions)
.mount('#app')
