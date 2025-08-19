<template>
  <div class="border-t border-green-500/30 py-8">
    <!-- <CHANGE> Redesigned header to match blog styling -->
    <h3 class="text-xl font-bold text-green-500 mb-8 glitch-text" data-text="Comments">
      Comments
    </h3>

    <!-- <CHANGE> Redesigned form to match cyberpunk theme -->
    <div class="mb-12 border border-green-500/30 bg-black p-6">
      <form @submit.prevent="submitComment" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-green-500 text-sm font-medium mb-2">Name</label>
            <input
              v-model="newComment.name"
              type="text"
              required
              class="w-full bg-black border border-green-500/50 text-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none transition-colors duration-300 placeholder-gray-600"
              placeholder="Your name"
            />
          </div>
          <div>
            <label class="block text-green-500 text-sm font-medium mb-2">Email</label>
            <input
              v-model="newComment.email"
              type="email"
              required
              class="w-full bg-black border border-green-500/50 text-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none transition-colors duration-300 placeholder-gray-600"
              placeholder="your@email.com"
            />
          </div>
        </div>
        <div>
          <label class="block text-green-500 text-sm font-medium mb-2">Comment</label>
          <textarea
            v-model="newComment.text"
            required
            rows="4"
            class="w-full bg-black border border-green-500/50 text-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none transition-colors duration-300 placeholder-gray-600 resize-none"
            placeholder="Share your thoughts..."
          ></textarea>
        </div>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="px-6 py-3 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span v-if="!isSubmitting">Post Comment</span>
          <span v-else class="flex items-center gap-2">
            <div class="w-4 h-4 border-2 border-t-green-500 border-r-green-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            Posting...
          </span>
        </button>
      </form>
    </div>

    <!-- <CHANGE> Redesigned comments list to match theme -->
    <div class="space-y-6">
      <div v-if="comments.length === 0" class="text-center py-12 text-gray-400">
        <MessageSquareIcon class="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No comments yet. Be the first to share your thoughts!</p>
      </div>

      <div
        v-for="comment in comments"
        :key="comment.id"
        class="border border-green-500/30 bg-black p-6 hover:border-green-500/50 transition-colors duration-300"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-green-500/10 border border-green-500/50 flex items-center justify-center">
              <UserIcon class="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h4 class="text-green-500 font-medium">{{ comment.name }}</h4>
              <p class="text-gray-400 text-sm">{{ formatDate(comment.timestamp) }}</p>
            </div>
          </div>

          <!-- <CHANGE> Redesigned dropdown menu with cyberpunk styling -->
          <div class="relative" v-if="canModifyComment(comment)">
            <button
              @click="toggleDropdown(comment.id)"
              class="p-2 text-gray-400 hover:text-green-500 transition-colors duration-300"
            >
              <MoreHorizontalIcon class="w-5 h-5" />
            </button>
            <div
              v-if="activeDropdown === comment.id"
              class="absolute right-0 top-full mt-2 w-32 bg-black border border-green-500/50 z-10"
            >
              <button
                @click="startEdit(comment)"
                class="w-full px-4 py-2 text-left text-gray-300 hover:bg-green-500/10 hover:text-green-500 transition-colors duration-300 flex items-center gap-2"
              >
                <EditIcon class="w-4 h-4" />
                Edit
              </button>
              <button
                @click="deleteComment(comment.id)"
                class="w-full px-4 py-2 text-left text-gray-300 hover:bg-red-500/10 hover:text-red-500 transition-colors duration-300 flex items-center gap-2"
              >
                <TrashIcon class="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>

        <!-- <CHANGE> Redesigned comment content and edit form -->
        <div v-if="editingComment?.id === comment.id" class="mb-4">
          <textarea
            v-model="editingComment.text"
            rows="3"
            class="w-full bg-black border border-green-500/50 text-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none transition-colors duration-300 resize-none"
          ></textarea>
          <div class="flex gap-2 mt-3">
            <button
              @click="saveEdit"
              class="px-4 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 text-sm"
            >
              Save
            </button>
            <button
              @click="cancelEdit"
              class="px-4 py-2 border border-gray-500 text-gray-400 hover:bg-gray-500 hover:text-black transition-all duration-300 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
        <div v-else class="mb-4">
          <p class="text-gray-300 leading-relaxed">{{ comment.text }}</p>
        </div>

        <!-- <CHANGE> Redesigned like/dislike buttons -->
        <div class="flex items-center gap-4">
          <button
            @click="toggleLike(comment.id)"
            :class="[
              'flex items-center gap-2 px-3 py-1 border transition-all duration-300 text-sm',
              hasLiked(comment.id) 
                ? 'border-green-500 text-green-500 bg-green-500/10' 
                : 'border-green-500/50 text-gray-400 hover:border-green-500 hover:text-green-500'
            ]"
          >
            <ThumbsUpIcon class="w-4 h-4" />
            {{ comment.likes || 0 }}
          </button>
          <button
            @click="toggleDislike(comment.id)"
            :class="[
              'flex items-center gap-2 px-3 py-1 border transition-all duration-300 text-sm',
              hasDisliked(comment.id) 
                ? 'border-red-500 text-red-500 bg-red-500/10' 
                : 'border-green-500/50 text-gray-400 hover:border-red-500 hover:text-red-500'
            ]"
          >
            <ThumbsDownIcon class="w-4 h-4" />
            {{ comment.dislikes || 0 }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  MoreHorizontalIcon, 
  EditIcon, 
  TrashIcon, 
  ThumbsUpIcon, 
  ThumbsDownIcon,
  UserIcon,
  MessageSquareIcon
} from 'lucide-vue-next'

const props = defineProps({
  postSlug: {
    type: String,
    required: true
  }
})

// ... existing code ...

const newComment = ref({
  name: '',
  email: '',
  text: ''
})

const comments = ref([])
const isSubmitting = ref(false)
const activeDropdown = ref(null)
const editingComment = ref(null)
const userSession = ref(null)
const userLikes = ref(new Set())
const userDislikes = ref(new Set())

// ... existing code ...

const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInMinutes = Math.floor((now - date) / (1000 * 60))
  
  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
  if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`
  
  return date.toLocaleDateString()
}

const getUserSession = () => {
  if (!userSession.value) {
    userSession.value = localStorage.getItem('comment-session') || 
      Math.random().toString(36).substring(2, 15)
    localStorage.setItem('comment-session', userSession.value)
  }
  return userSession.value
}

const loadComments = () => {
  const stored = localStorage.getItem(`comments-${props.postSlug}`)
  comments.value = stored ? JSON.parse(stored) : []
  
  const storedLikes = localStorage.getItem(`likes-${getUserSession()}`)
  userLikes.value = new Set(storedLikes ? JSON.parse(storedLikes) : [])
  
  const storedDislikes = localStorage.getItem(`dislikes-${getUserSession()}`)
  userDislikes.value = new Set(storedDislikes ? JSON.parse(storedDislikes) : [])
}

const saveComments = () => {
  localStorage.setItem(`comments-${props.postSlug}`, JSON.stringify(comments.value))
}

const submitComment = () => {
  if (!newComment.value.name.trim() || !newComment.value.email.trim() || !newComment.value.text.trim()) {
    return
  }
  
  isSubmitting.value = true
  
  setTimeout(() => {
    const comment = {
      id: Date.now().toString(),
      name: newComment.value.name.trim(),
      email: newComment.value.email.trim(),
      text: newComment.value.text.trim(),
      timestamp: Date.now(),
      userSession: getUserSession(),
      likes: 0,
      dislikes: 0
    }
    
    comments.value.unshift(comment)
    saveComments()
    
    newComment.value = { name: '', email: '', text: '' }
    isSubmitting.value = false
  }, 500)
}

const canModifyComment = (comment) => {
  return comment.userSession === getUserSession()
}

const toggleDropdown = (commentId) => {
  activeDropdown.value = activeDropdown.value === commentId ? null : commentId
}

const startEdit = (comment) => {
  editingComment.value = { ...comment }
  activeDropdown.value = null
}

const saveEdit = () => {
  if (!editingComment.value.text.trim()) return
  
  const index = comments.value.findIndex(c => c.id === editingComment.value.id)
  if (index !== -1) {
    comments.value[index].text = editingComment.value.text.trim()
    comments.value[index].edited = true
    saveComments()
  }
  editingComment.value = null
}

const cancelEdit = () => {
  editingComment.value = null
}

const deleteComment = (commentId) => {
  if (confirm('Are you sure you want to delete this comment?')) {
    comments.value = comments.value.filter(c => c.id !== commentId)
    saveComments()
    activeDropdown.value = null
  }
}

const toggleLike = (commentId) => {
  const comment = comments.value.find(c => c.id === commentId)
  if (!comment) return
  
  if (userLikes.value.has(commentId)) {
    userLikes.value.delete(commentId)
    comment.likes = Math.max(0, (comment.likes || 0) - 1)
  } else {
    userLikes.value.add(commentId)
    comment.likes = (comment.likes || 0) + 1
    
    if (userDislikes.value.has(commentId)) {
      userDislikes.value.delete(commentId)
      comment.dislikes = Math.max(0, (comment.dislikes || 0) - 1)
    }
  }
  
  saveComments()
  localStorage.setItem(`likes-${getUserSession()}`, JSON.stringify([...userLikes.value]))
  localStorage.setItem(`dislikes-${getUserSession()}`, JSON.stringify([...userDislikes.value]))
}

const toggleDislike = (commentId) => {
  const comment = comments.value.find(c => c.id === commentId)
  if (!comment) return
  
  if (userDislikes.value.has(commentId)) {
    userDislikes.value.delete(commentId)
    comment.dislikes = Math.max(0, (comment.dislikes || 0) - 1)
  } else {
    userDislikes.value.add(commentId)
    comment.dislikes = (comment.dislikes || 0) + 1
    
    if (userLikes.value.has(commentId)) {
      userLikes.value.delete(commentId)
      comment.likes = Math.max(0, (comment.likes || 0) - 1)
    }
  }
  
  saveComments()
  localStorage.setItem(`likes-${getUserSession()}`, JSON.stringify([...userLikes.value]))
  localStorage.setItem(`dislikes-${getUserSession()}`, JSON.stringify([...userDislikes.value]))
}

const hasLiked = (commentId) => userLikes.value.has(commentId)
const hasDisliked = (commentId) => userDislikes.value.has(commentId)

const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    activeDropdown.value = null
  }
}

onMounted(() => {
  loadComments()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.glitch-text {
  position: relative;
  text-shadow:
    0.05em 0 0 rgba(255, 0, 0, 0.75),
    -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
    0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  animation: glitch 500ms infinite;
}

@keyframes glitch {
  0% {
    text-shadow:
      0.05em 0 0 rgba(255, 0, 0, 0.75),
      -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
      -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  }
  14% {
    text-shadow:
      0.05em 0 0 rgba(255, 0, 0, 0.75),
      -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
      -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  }
  15% {
    text-shadow:
      -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
      0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
      -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  49% {
    text-shadow:
      -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
      0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
      -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  50% {
    text-shadow:
      0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
      0.05em 0 0 rgba(0, 255, 0, 0.75),
      0 -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  99% {
    text-shadow:
      0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
      0.05em 0 0 rgba(0, 255, 0, 0.75),
      0 -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  100% {
    text-shadow:
      -0.025em 0 0 rgba(255, 0, 0, 0.75),
      -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
      -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
}

@media (prefers-reduced-motion: reduce) {
  .glitch-text {
    animation: none;
    text-shadow: none;
  }
}
</style>