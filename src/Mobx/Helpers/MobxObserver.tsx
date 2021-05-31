import { inject, observer } from 'mobx-react';

export default function (component: any) {
  return inject((props) => (props))(observer(component));
}
