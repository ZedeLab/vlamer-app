import React from 'react';
import { AuthProvider } from '../../services/auth';
import { StaticDataProvider } from '../../services/staticURLs';
import { VoltAccessProvider } from '../../services/voltAccess';
import { ChatProvider } from '../../services/chat';
import { Provider as PageProvider } from 'react-native-paper';
import { Provider as StateProvider } from 'react-redux';
import theme from '../../utils/theme';
import { store } from '../../store/store';
import { FeedsVlamListProvider } from '../../services/feedsAccess';
import { LikesAccessProvider } from '../../services/likesAccess';
import { CurrentUserVlamListProvider } from '../../services/userVlamListAccess';
import { UserConnectionProvider } from '../../services/userConnectionsAccess';
import { NotificationsAccessProvider } from '../../services/notification';

export const ServicesProviderWrapper = (props) => {
  const { children } = props;

  return (
    <StaticDataProvider>
      <StateProvider store={store}>
        <PageProvider theme={theme}>
          <AuthProvider>
            <NotificationsAccessProvider>
              <UserConnectionProvider>
                <ChatProvider>
                  <VoltAccessProvider>
                    <FeedsVlamListProvider>
                      <CurrentUserVlamListProvider>
                        <LikesAccessProvider>{children}</LikesAccessProvider>
                      </CurrentUserVlamListProvider>
                    </FeedsVlamListProvider>
                  </VoltAccessProvider>
                </ChatProvider>
              </UserConnectionProvider>
            </NotificationsAccessProvider>
          </AuthProvider>
        </PageProvider>
      </StateProvider>
    </StaticDataProvider>
  );
};

export default ServicesProviderWrapper;
