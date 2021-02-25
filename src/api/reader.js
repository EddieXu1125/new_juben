import { postRequest, postDataFormRequest, postJsonRequest, getRequest } from '@/utils/request'

export function pulldata(drama_id,episode_id) {
    return postRequest("/jeditor/api/episodeemelemtscene/"+drama_id +"/" + episode_id)
  }

export function pullcontent(drama_id,episode_id,scene_id){
  return postRequest("/jeditor/api/dialog/" + drama_id + "/" + episode_id +"/" + scene_id)
}