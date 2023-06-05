import { Component, Show } from 'solid-js';
import { createPWA } from './createPWA.hook';
import { Button } from '../../lib/Button/Button.component';

export const Installation: Component = () => {
  const { isInstallPromptSupported, isStandalone, promptInstall } = createPWA();

  const onClick = () => {
    if (isInstallPromptSupported() && !isStandalone()) {
      return promptInstall();
    }

    alert(`
      You can install this as an App!

      Android:
      Just select the corresponding button from your browser's menu:
      Add to phone, Add to home screen, or something similar.
      
      iOS Safari:
      Share -> Add to Home Screen.
      
      Desktop:
      Look for the install button in the address bar.  
    `);
  };

  return (
    <Show when={!isStandalone()}>
      <Button variant="info" onClick={onClick}>
        Install App
      </Button>
    </Show>
  );
};
