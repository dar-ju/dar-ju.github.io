import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getFooterDataApi, getInvitationDataApi } from '@/api/sections'

export const useSectionStore = defineStore('section', () => {
  const footer = ref(null)
  const invitation = ref(null)

  const getFooterData = async () => {
    const footerData = await getFooterDataApi()
    footer.value = footerData[0]
  }

  const getInvitationData = async () => {
    const invData = await getInvitationDataApi()
    invitation.value = invData[0]
  }

  return { footer, invitation, getFooterData, getInvitationData }
})
