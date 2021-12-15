import {gql, useMutation} from '@apollo/client';
import {ReactNativeFile} from 'apollo-upload-client';
import React from 'react';
import {View, Pressable, Text} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const UPLOAD_IMAGE = gql`
  mutation Carregar($arquivo: Upload!) {
    usuarios {
      carregarAvatar(arquivo: $arquivo)
    }
  }
`;

export const Upload = () => {
  const [carregar] = useMutation(UPLOAD_IMAGE);
  return (
    <View>
      <Pressable
        onPress={async () => {
          const result = await launchImageLibrary({
            mediaType: 'photo',
          });
          console.log(result.assets);

          if (result && result.assets.length) {
            const [asset] = result.assets;
            const arquivo = new ReactNativeFile({
              uri: asset.uri,
              type: asset.type,
              name: asset.fileName,
            });
            console.log(
              await carregar({
                variables: {arquivo},
              }),
            );
          }
        }}>
        <Text>Enviar</Text>
      </Pressable>
    </View>
  );
};
