<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click="toggleDropdown"
      class="w-full px-4 py-3 bg-gray-900 text-green-500 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-gray-800 transition-colors duration-200 flex items-center justify-between min-h-[44px]"
      :class="{ 'ring-2 ring-green-500': isOpen }"
    >
      <span class="truncate text-left">{{ displayValue }}</span>
      <i
        class="bi bi-chevron-down transition-transform duration-200 flex-shrink-0 ml-2"
        :class="{ 'rotate-180': isOpen }"
      ></i>
    </button>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute z-50 w-full mt-1 bg-gray-900 border border-green-500 rounded-md shadow-lg shadow-green-500/20 max-h-60 overflow-auto"
      >
        <div
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
          class="px-4 py-3 text-green-500 hover:bg-gray-800 cursor-pointer transition-colors duration-150 flex items-center justify-between min-h-[44px]"
          :class="{ 'bg-gray-800': option.value === modelValue }"
        >
          <span class="truncate">{{ option.label }}</span>
          <span
            v-if="option.count !== undefined"
            class="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded flex-shrink-0 ml-2"
          >
            {{ option.count }}
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Select option",
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const dropdownRef = ref(null);

const displayValue = computed(() => {
  const selected = props.options.find(
    (option) => option.value === props.modelValue,
  );
  return selected ? selected.label : props.placeholder;
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  emit("update:modelValue", option.value);
  isOpen.value = false;
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
