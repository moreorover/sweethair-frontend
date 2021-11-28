<template>
  <div class="flex flex-col lg:flex-row justify-center min-w-max gap-4">
    <div class="flex flex-col w-full lg:w-1/2">
      <p>Selection:</p>
      <ul>
        <slot name="selection" />
      </ul>
    </div>
    <div class="flex flex-col w-full lg:w-1/2">
      <div>
        <slot name="search" />
      </div>
      <div class="rounded-lg w-full">
        <p>Options:</p>
        <ul>
          <slot name="options" />
        </ul>
      </div>
    </div>
  </div>
</template>
