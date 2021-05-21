import { createApp } from 'vue'
import CssSelectorBuilder from './CssSelectorBuilder.vue'
import FormOperationsArrays from './components/FormOperationsArrays.vue'
import './index.css'
import '@fontsource/inconsolata/400.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'

createApp(CssSelectorBuilder)
.component('FormOperationsArrays', FormOperationsArrays)
.mount('#app')
