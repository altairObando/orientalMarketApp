import { Slot, Stack } from 'expo-router';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

export default function RootLayout() {
  // return <Slot />
  return <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={ eva.light } >
      <Slot />
    </ApplicationProvider>
  </>;
}
