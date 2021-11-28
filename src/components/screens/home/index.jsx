import React, { useState } from 'react';
import { styles } from './styles';
import { FlatList, Text } from 'react-native';
import { CompleteRegistrationBanner } from '../../common/banners';
import VlamPosts from '../../sections/cards/VlamPostCard';
import PageAux from '../../hoc/PageAux';
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import { selectActors } from '../../../store/actors';
import { LottieIcon } from '../../common/animations';
import { useAuth } from '../../../services/auth';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

export default Home = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [loadMoreVlams, setLoadMoreVlams] = useState(false);
  const navigation = useNavigation();
  const actors = useSelector(selectActors);

  if (!user || !actors.currentUserFeedList) {
    return <Text>Loading...</Text>;
  }

  const renderVlams = ({ item }) => {
    return (
      <VlamPosts
        key={item.id}
        id={item.id}
        likes={item.likes}
        likeIds={item.likeUsersIds}
        totalLikes={item.totalNumberOfLikes}
        authorAccount={item.__ownerAccountSnapShot}
        postedAt={item.postedAt}
        vlamType={''}
        message={item.message}
        numberOfParticipants={item.numberOfParticipants}
        participatingPrice={item.participatingPrice}
        winingPrice={item.winingPrice}
        createdAt={item.createdAt}
        navigation={navigation}
      />
    );
  };

  return (
    <PageAux noGutter>
      <CompleteRegistrationBanner />
      <FlatList
        data={actors.currentUserFeedList}
        renderItem={renderVlams}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.wrapper}
        // onEndReachedThreshold={0.2}
        // onEndReached={(event) => setLoadMoreVlams(true)}
      />
      {loadMoreVlams && (
        <LottieIcon
          autoPlay={true}
          loop={true}
          src={require('../../../../assets/lottie/scroll-down.json')}
          style={styles.iconBig}
        />
      )}
    </PageAux>
  );
};
