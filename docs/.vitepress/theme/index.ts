import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import FeedbackWidget from './FeedbackWidget.vue'
import PageTracker from './PageTracker.vue'
import HomePage from './HomePage.vue'
import AnalyticsDashboard from './AnalyticsDashboard.vue'
import SupportTicketForm from './SupportTicketForm.vue'
import FeatureIdeasBoard from './FeatureIdeasBoard.vue'
import AdminFooterLink from './AdminFooterLink.vue'
import ApiCodeSamples from './ApiCodeSamples.vue'
import ApiTryIt from './ApiTryIt.vue'
import ApiSection from './ApiSection.vue'
import ApiEndpoint from './ApiEndpoint.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomePage', HomePage)
    app.component('FeedbackWidget', FeedbackWidget)
    app.component('PageTracker', PageTracker)
    app.component('AnalyticsDashboard', AnalyticsDashboard)
    app.component('SupportTicketForm', SupportTicketForm)
    app.component('FeatureIdeasBoard', FeatureIdeasBoard)
    app.component('AdminFooterLink', AdminFooterLink)
    app.component('ApiCodeSamples', ApiCodeSamples)
    app.component('ApiTryIt', ApiTryIt)
    app.component('ApiSection', ApiSection)
    app.component('ApiEndpoint', ApiEndpoint)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => [h(PageTracker), h(FeedbackWidget), h(AdminFooterLink)],
    })
  },
}
