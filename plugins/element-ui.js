import Vue from 'vue'
// import Element from 'element-ui'
// import locale from 'element-ui/lib/locale/lang/en'
import { Row, Col, Button, Input, Card, Container, Header, Main, Aside, Backtop, Pagination, Autocomplete } from 'element-ui'
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Input)
Vue.use(Card)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Backtop)
Vue.use(Pagination)
Vue.use(Input)
Vue.use(Autocomplete)
import 'element-ui/lib/theme-chalk/base.css';

import ZoomTransition from 'element-ui/lib/transitions/collapse-transition';


Vue.component(ZoomTransition.name, ZoomTransition)