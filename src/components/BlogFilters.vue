<template>
  <div class="space-y-4">
    <div class="relative">
      <input
        v-model="localSearchQuery"
        @input="updateSearch"
        type="text"
        placeholder="Search the matrix..."
        class="w-full px-4 py-3 bg-gray-900 text-green-500 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pl-10"
      />
      <svg
        class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>

    <div class="space-y-3 md:space-y-0 md:flex md:flex-wrap md:gap-4 md:items-center">
      <div class="w-full md:min-w-[180px] md:max-w-[220px] md:flex-1">
        <CyberDropdown
          v-model="localSelectedCategory"
          :options="categoryOptions"
          placeholder="All Categories"
          @update:modelValue="updateCategory"
        />
      </div>

      <div class="w-full md:min-w-[180px] md:max-w-[220px] md:flex-1">
        <CyberDropdown
          v-model="localSelectedTag"
          :options="tagOptions"
          placeholder="All Tags"
          @update:modelValue="updateTag"
        />
      </div>

      <div class="flex gap-3 md:min-w-[200px]">
        <div class="flex-1 md:min-w-[140px]">
          <CyberDropdown
            v-model="localSortOrder"
            :options="sortOptions"
            placeholder="Sort by"
            @update:modelValue="updateSort"
          />
        </div>

        <button
          v-if="hasActiveFilters"
          @click="clearFilters"
          class="px-4 py-2 text-sm bg-red-900 text-red-400 border border-red-500 rounded-md hover:bg-red-800 transition-colors duration-200 whitespace-nowrap"
        >
          Clear
        </button>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-400">
      <span>
        Showing {{ filteredCount }} of {{ totalCount }} posts
        <span v-if="hasActiveFilters" class="text-green-500">
          (filtered)
        </span>
      </span>
      
      <div v-if="hasActiveFilters" class="flex flex-wrap gap-2">
        <span
          v-if="localSelectedCategory"
          class="px-2 py-1 bg-green-500/10 text-green-400 rounded-full text-xs border border-green-500/40 max-w-[120px] truncate"
          :title="`Category: ${getCategoryLabel(localSelectedCategory)}`"
        >
          {{ getCategoryLabel(localSelectedCategory) }}
        </span>
        <span
          v-if="localSelectedTag"
          class="px-2 py-1 bg-green-500/10 text-green-400 rounded-full text-xs border border-green-500/40 max-w-[120px] truncate"
          :title="`Tag: ${getTagLabel(localSelectedTag)}`"
        >
          #{{ getTagLabel(localSelectedTag) }}
        </span>
        <span
          v-if="localSearchQuery"
          class="px-2 py-1 bg-green-500/10 text-green-400 rounded-full text-xs border border-green-500/40 max-w-[120px] truncate"
          :title="`Search: ${localSearchQuery}`"
        >
          "{{ localSearchQuery }}"
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import CyberDropdown from './CyberDropdown.vue'

const props = defineProps({
  posts: {
    type: Array,
    required: true
  },
  searchQuery: {
    type: String,
    default: ''
  },
  selectedCategory: {
    type: String,
    default: ''
  },
  selectedTag: {
    type: String,
    default: ''
  },
  sortOrder: {
    type: String,
    default: 'newest'
  },
  filteredCount: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:searchQuery', 'update:selectedCategory', 'update:selectedTag', 'update:sortOrder'])

const localSearchQuery = ref(props.searchQuery)
const localSelectedCategory = ref(props.selectedCategory)
const localSelectedTag = ref(props.selectedTag)
const localSortOrder = ref(props.sortOrder)

watch(() => props.searchQuery, (newVal) => { localSearchQuery.value = newVal })
watch(() => props.selectedCategory, (newVal) => { localSelectedCategory.value = newVal })
watch(() => props.selectedTag, (newVal) => { localSelectedTag.value = newVal })
watch(() => props.sortOrder, (newVal) => { localSortOrder.value = newVal })

const categoryOptions = computed(() => {
  const counts = new Map()
  props.posts.forEach(post => {
    if (post.category) {
      counts.set(post.category, (counts.get(post.category) || 0) + 1)
    }
  })
  const sorted = Array.from(counts.entries())
    .map(([value, count]) => ({ value, label: value, count }))
    .sort((a, b) => a.label.localeCompare(b.label))
  const allOption = { value: '', label: 'All Categories', count: props.posts.length }
  return [allOption, ...sorted]
})

const tagOptions = computed(() => {
  const counts = new Map()
  props.posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => counts.set(tag, (counts.get(tag) || 0) + 1))
    }
  })
  const sorted = Array.from(counts.entries())
    .map(([value, count]) => ({ value, label: value, count }))
    .sort((a, b) => a.label.localeCompare(b.label))
  const allOption = { value: '', label: 'All Tags', count: props.posts.length }
  return [allOption, ...sorted]
})

const sortOptions = computed(() => [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title', label: 'Title A-Z' },
  { value: 'title-desc', label: 'Title Z-A' }
])

const totalCount = computed(() => props.posts.length)

const hasActiveFilters = computed(() => {
  return localSearchQuery.value || localSelectedCategory.value || localSelectedTag.value
})

const getCategoryLabel = (value) => {
  const option = categoryOptions.value.find(opt => opt.value === value)
  return option ? option.label : value
}

const getTagLabel = (value) => {
  const option = tagOptions.value.find(opt => opt.value === value)
  return option ? option.label : value
}

const updateSearch = () => {
  emit('update:searchQuery', localSearchQuery.value)
}

const updateCategory = (value) => {
  emit('update:selectedCategory', value)
}

const updateTag = (value) => {
  emit('update:selectedTag', value)
}

const updateSort = (value) => {
  emit('update:sortOrder', value)
}

const clearFilters = () => {
  localSearchQuery.value = ''
  localSelectedCategory.value = ''
  localSelectedTag.value = ''
  emit('update:searchQuery', '')
  emit('update:selectedCategory', '')
  emit('update:selectedTag', '')
}
</script>