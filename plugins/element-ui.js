import Vue from 'vue'
// import Element from 'element-ui'
// import locale from 'element-ui/lib/locale/lang/en'
import { Row, Col, Button, Input, Card, Container, Header, Main, Aside, Backtop, Pagination, Autocomplete, Dialog, Message, Avatar } from 'element-ui'
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
Vue.use(Dialog)
Vue.use(Avatar)
import 'element-ui/lib/theme-chalk/base.css';

import ZoomTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.prototype.$message = Message;
Vue.component(ZoomTransition.name, ZoomTransition)