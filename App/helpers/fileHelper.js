export function detectTypeImage(name){
   const videoExtensions = ['.mp4', '.webm', '.avi'];
   const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
   let lstDot = name.lastIndexOf('.');
   if(lstDot < 0){
     return "Can't determine"
   }
   console.log(lstDot);
   let ex = name.substring(lstDot)
   console.log(ex);
   if(videoExtensions.indexOf(ex) >= 0){
     return "video";
   }
   if(imageExtensions.indexOf(ex) >= 0){
     return "image";
   }
   return ex;
 }

import Swal from 'sweetalert2';
export function positiveFeedback(response_text){
Swal.fire({
  position: "top-end",
  icon: "success",
  title: response_text,
  showConfirmButton: false,
  timer: 1500
});
}