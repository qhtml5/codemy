import React        from 'react';
import classNames   from 'classnames';
import styles       from './filterable.sass';

class Filterable extends React.PureComponent {
  render() { 
    return <div id='filterable'>
      <div className={classNames(styles.filter, { [styles.playlist]: this.props.playback })}>
        {this.props.filter}
      </div>
      <div className={classNames(styles.results, { [styles.video]: this.props.playback })}>
        {this.props.children}
      </div>
    </div>;
  }
}

export default Filterable;
