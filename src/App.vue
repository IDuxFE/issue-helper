<script setup lang="ts"></script>

<template>
  <IxModalProvider>
    <IxMessageProvider>
      <IxLayout>
        <IxLayoutHeader></IxLayoutHeader>
        <IxLayoutSider></IxLayoutSider>
        <IxLayoutContent>
          <RouterView></RouterView>
        </IxLayoutContent>
        <IxLayoutFooter></IxLayoutFooter>
      </IxLayout>
    </IxMessageProvider>
  </IxModalProvider>
</template>
