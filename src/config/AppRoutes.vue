<script>
import ExtraError from '../views/Extra-error';
import Main from '../views/Main.vue';

const routes = [
  {path: '/main', component: Main},

  { path: '*', component: ExtraError },
];

export default routes;
</script>
