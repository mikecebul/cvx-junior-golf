// import Container from "@/components/Container"
// import { HeroMedium } from "@/components/Hero/HeroMedium"
// import { CMSLink } from "@/components/Link"
// import { ResourcesBlock as ResourcesBlockType } from "@/payload-types"
// import { div } from "framer-motion/client"
// import Image from "next/image"

// export const ResourcesBlock = ({ title, description, resources, image, link }: ResourcesBlockType) => {

//   return (
//     <Container>
//       <div className="flex flex-col items-center justify-center space-y-4 text-center">
//         {!!title && (
//           <HeroMedium title={title} description={description} />
//         )}
//       </div>
//       <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
//         <div className="flex flex-col justify-center space-y-4">
//           <ul className="grid gap-6">
//             {!!resources && Array.isArray(resources) && resources.map((resource) => {
//               if (typeof resource === 'object' && resource !== null) {
//                 return (
//                   <li key={resource.id}>
//                     <div className="grid gap-1">
//                       <h3 className="text-xl font-bold">{resource.title}</h3>
//                       <p className="text-muted-foreground">
//                         {resource.description}
//                       </p>
//                       {!!resource.links && Array.isArray(resource.links) && resource.links.map(({ link }) => (
//                         <>
//                           <CMSLink {...link} appearance="brandOutline" />
//                         </>
//                       ))}
//                     </div>
//                   </li>
//                 )
//               }
//             })}
//             {!!link && (
//               <CMSLink {...link} appearance="brand"
//                 className="" />
//             )}
//           </ul>
//         </div>
//         {!!image && typeof image === 'object' && (
//           <Image
//             src={image.url ?? '/placeholder.png'}
//             alt="Resources"
//             className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
//             width="550"
//             height="310"
//           />
//         )}
//       </div >
//     </Container>
//   )
// }