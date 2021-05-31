/* eslint-disable react/no-multi-comp */
import React from 'react';
import { matchPath } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, Typography } from '@material-ui/core';

import NavigationListItem from './NavigationListItem';
import { useLocation } from 'react-router';

const useStyles = makeStyles((theme: any) => ({
  root: {
    marginBottom: theme.spacing(3)
  }
}));

const NavigationList = (props: any) => {
  const { pages, ...rest } = props;
  const location = useLocation()

  return (
    <List>
      {pages.reduce(
        (items: any, page: any) => reduceChildRoutes({ location, items, page, ...rest }),
        []
      )}
    </List>
  );
};


const reduceChildRoutes = (props: any) => {

  const { items, page, depth, location } = props;

  if (page.children) {
    const open = matchPath({ path: page.href, caseSensitive: false }, location.pathname);

    items.push(
      <NavigationListItem
        depth={depth}
        icon={page.icon}
        key={page.title}
        label={page.label}
        open={Boolean(open)}
        title={page.title}
      >
        <NavigationList
          depth={depth + 1}
          pages={page.children}
        />
      </NavigationListItem>
    );
  } else {
    items.push(
      <NavigationListItem
        depth={depth}
        href={page.href}
        icon={page.icon}
        key={page.title}
        label={page.label}
        title={page.title}
      />
    );
  }

  return items;
};

const Navigation = (props: any) => {
  const { title, pages, className, component: Component, ...rest } = props;

  const classes = useStyles();

  return (
    <Component
      {...rest}
      className={clsx(classes.root, className)}
    >
      {title && <Typography variant="overline">{title}</Typography>}
      <NavigationList
        depth={0}
        pages={pages}
      />
    </Component>
  );
};

Navigation.propTypes = {
  className: PropTypes.string,
  component: PropTypes.any,
  pages: PropTypes.array.isRequired,
  title: PropTypes.string
};

Navigation.defaultProps = {
  component: 'nav'
};

export default Navigation;
