import React from 'react';
import {navigationScheme} from 'core';
import CountItem from './CountItem.component';
import {ListItem,ListItemIcon} from '@material-ui/core';

import StoreIcon from 'assets/svg/navigation-menu/store.svg';
import DraftsIcon from 'assets/svg/navigation-menu/envelope.svg';
import ArchiveIcon from 'assets/svg/navigation-menu/archive.svg';
import TransformIcon from 'assets/svg/navigation-menu/new-item.svg';
import ShoppingCartIcon from 'assets/svg/navigation-menu/basket.svg';
import SharesIcon from 'assets/svg/navigation-menu/shares.svg';

export const firstMenuItems = [
  {
    to: navigationScheme.catalog,
    icon: StoreIcon,
    text: 'каталог товарів',
    title:'go to catalog page'
  },
  {
    to: {
      pathname: navigationScheme.sharesAndNews,
      state: "shares",
    },
    icon: SharesIcon,
    text: 'акції і пропозиції',
    title:'go to shared page'
  },
  {
    to: {
      pathname: navigationScheme.sharesAndNews,
      state: "news",
    },
    icon: TransformIcon,
    text: 'нові поступлення',
    number: <CountItem storageTarget="news"/>,
    title:'go to offers page'
  },
];

export const secondMenuItems = [
  {
    to: navigationScheme.archive,
    icon: ArchiveIcon,
    text: 'архів замовлень',
    number: <CountItem storageTarget="archive"/>,
    title:'go to archive orders page'
  },
  {
    to: navigationScheme.basket,
    icon: ShoppingCartIcon,
    text: 'позицій в кошику',
    number: <CountItem storageTarget="basket"/>,
    title:'go to basket page'
  },
];

export const managerBlock = (
  <ListItem className="menu-item">
    <button aria-label="open a modal window in which you can write a message to the manager" className="menu-link">
      <ListItemIcon>
        <DraftsIcon className="menu-icon"/>
      </ListItemIcon>
    </button>
  </ListItem>
);
