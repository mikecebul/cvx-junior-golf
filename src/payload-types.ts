/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "LinkCards".
 */
export type LinkCards =
  | {
      linkType?: ('link' | 'video') | null;
      title: string;
      description: string;
      imageUploadOption?: ('generate' | 'manual') | null;
      keywords?: string | null;
      image?: (number | null) | Card;
      href: string;
      id?: string | null;
    }[]
  | null;

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    pages: Page;
    events: Event;
    resources: Resource;
    avatars: Avatar;
    cards: Card;
    landscapes: Landscape;
    portraits: Portrait;
    'meta-images': MetaImage;
    files: File;
    users: User;
    redirects: Redirect;
    forms: Form;
    'form-submissions': FormSubmission;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  db: {
    defaultIDType: number;
  };
  globals: {
    header: Header;
    footer: Footer;
    'company-info': CompanyInfo;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  title: string;
  layout: (
    | Hero
    | EventsBlock
    | HowItWorksBlock
    | HistoryBlock
    | ResourcesBlock
    | DonateBlock
    | RichTextBlock
    | LinksBlock
    | EventsPageBlock
    | FormBlock
  )[];
  meta?: {
    hideFromSearchEngines?: boolean | null;
    metadata?: {
      title?: string | null;
      image?: (number | null) | MetaImage;
      description?: string | null;
    };
  };
  publishedAt?: string | null;
  slug?: string | null;
  slugLock?: boolean | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Hero".
 */
export interface Hero {
  type: 'highImpact' | 'mediumImpact';
  highImpact?: {
    title: string;
    description: string;
    links?:
      | {
          link: {
            type?: ('reference' | 'custom') | null;
            newTab?: boolean | null;
            reference?:
              | ({
                  relationTo: 'pages';
                  value: number | Page;
                } | null)
              | ({
                  relationTo: 'files';
                  value: number | File;
                } | null);
            url?: string | null;
            label: string;
            appearance?: ('default' | 'outline') | null;
          };
          id?: string | null;
        }[]
      | null;
    image: number | Landscape;
  };
  mediumImpact?: {
    subtitle?: string | null;
    title: string;
    description?: string | null;
  };
  id?: string | null;
  blockName?: string | null;
  blockType: 'hero';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "files".
 */
export interface File {
  id: number;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "landscapes".
 */
export interface Landscape {
  id: number;
  alt: string;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "EventsBlock".
 */
export interface EventsBlock {
  title: string;
  description: string;
  eventItems?: (number | Event)[] | null;
  image: number | Landscape;
  id?: string | null;
  blockName?: string | null;
  blockType: 'events';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events".
 */
export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "HowItWorksBlock".
 */
export interface HowItWorksBlock {
  title?: string | null;
  description?: string | null;
  links?:
    | {
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?:
            | ({
                relationTo: 'pages';
                value: number | Page;
              } | null)
            | ({
                relationTo: 'files';
                value: number | File;
              } | null);
          url?: string | null;
          label: string;
          appearance?: ('default' | 'outline') | null;
        };
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'howItWorks';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "HistoryBlock".
 */
export interface HistoryBlock {
  title?: string | null;
  description?: string | null;
  image?: (number | null) | Landscape;
  items?:
    | {
        title?: string | null;
        description?: string | null;
        id?: string | null;
      }[]
    | null;
  link: {
    type?: ('reference' | 'custom') | null;
    newTab?: boolean | null;
    reference?:
      | ({
          relationTo: 'pages';
          value: number | Page;
        } | null)
      | ({
          relationTo: 'files';
          value: number | File;
        } | null);
    url?: string | null;
    label: string;
    appearance?: ('default' | 'outline') | null;
  };
  id?: string | null;
  blockName?: string | null;
  blockType: 'history';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ResourcesBlock".
 */
export interface ResourcesBlock {
  title: string;
  description: string;
  resources?: (number | Resource)[] | null;
  image?: (number | null) | Landscape;
  link: {
    type?: ('reference' | 'custom') | null;
    newTab?: boolean | null;
    reference?:
      | ({
          relationTo: 'pages';
          value: number | Page;
        } | null)
      | ({
          relationTo: 'files';
          value: number | File;
        } | null);
    url?: string | null;
    label: string;
    appearance?: ('default' | 'outline') | null;
  };
  id?: string | null;
  blockName?: string | null;
  blockType: 'resources';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "resources".
 */
export interface Resource {
  id: number;
  title: string;
  description: string;
  links?:
    | {
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?:
            | ({
                relationTo: 'pages';
                value: number | Page;
              } | null)
            | ({
                relationTo: 'files';
                value: number | File;
              } | null);
          url?: string | null;
          label: string;
          appearance?: ('default' | 'outline') | null;
        };
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "DonateBlock".
 */
export interface DonateBlock {
  title?: string | null;
  description?: string | null;
  link: {
    type?: ('reference' | 'custom') | null;
    newTab?: boolean | null;
    reference?:
      | ({
          relationTo: 'pages';
          value: number | Page;
        } | null)
      | ({
          relationTo: 'files';
          value: number | File;
        } | null);
    url?: string | null;
    label: string;
    appearance?: ('default' | 'outline') | null;
  };
  image?: (number | null) | Landscape;
  id?: string | null;
  blockName?: string | null;
  blockType: 'donate';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "RichTextBlock".
 */
export interface RichTextBlock {
  subtitle?: string | null;
  richContent?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  images?: (number | Landscape)[] | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'richText';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "LinksBlock".
 */
export interface LinksBlock {
  hero?: Hero[] | null;
  linkCards?: LinkCards;
  id?: string | null;
  blockName?: string | null;
  blockType: 'linksBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "cards".
 */
export interface Card {
  id: number;
  alt: string;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "EventsPageBlock".
 */
export interface EventsPageBlock {
  title?: string | null;
  events?: (number | Event)[] | null;
  announcements?:
    | {
        title?: string | null;
        description?: string | null;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'eventsPage';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FormBlock".
 */
export interface FormBlock {
  form: number | Form;
  enableIntro?: boolean | null;
  introContent?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  enableStripe?: boolean | null;
  paymentStatus?: ('pending' | 'paid' | 'failed') | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'formBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "forms".
 */
export interface Form {
  id: number;
  title: string;
  fields?:
    | (
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            defaultValue?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'checkbox';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'country';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'email';
          }
        | {
            message?: {
              root: {
                type: string;
                children: {
                  type: string;
                  version: number;
                  [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
              };
              [k: string]: unknown;
            } | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'message';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'number';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            basePrice?: number | null;
            paymentProcessor?: 'stripe' | null;
            priceConditions?:
              | {
                  fieldToUse?: string | null;
                  condition?: ('hasValue' | 'equals' | 'notEquals') | null;
                  valueForCondition?: string | null;
                  operator?: ('add' | 'subtract' | 'multiply' | 'divide') | null;
                  valueType?: ('static' | 'valueOfField') | null;
                  valueForOperator?: string | null;
                  id?: string | null;
                }[]
              | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'payment';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            options?:
              | {
                  label: string;
                  value: string;
                  id?: string | null;
                }[]
              | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'select';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'state';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'text';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'textarea';
          }
      )[]
    | null;
  submitButtonLabel?: string | null;
  confirmationType?: ('message' | 'redirect') | null;
  confirmationMessage?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  redirect?: {
    url: string;
  };
  emails?:
    | {
        emailTo?: string | null;
        cc?: string | null;
        bcc?: string | null;
        replyTo?: string | null;
        emailFrom?: string | null;
        subject: string;
        message?: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "meta-images".
 */
export interface MetaImage {
  id: number;
  alt: string;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "avatars".
 */
export interface Avatar {
  id: number;
  alt: string;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "portraits".
 */
export interface Portrait {
  id: number;
  alt: string;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  name?: string | null;
  role: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "redirects".
 */
export interface Redirect {
  id: number;
  from: string;
  to?: {
    type?: ('reference' | 'custom') | null;
    reference?: {
      relationTo: 'pages';
      value: number | Page;
    } | null;
    url?: string | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "form-submissions".
 */
export interface FormSubmission {
  id: number;
  form: number | Form;
  submissionData?:
    | {
        field: string;
        value: string;
        id?: string | null;
      }[]
    | null;
  payment?: {
    field?: string | null;
    status?: string | null;
    amount?: number | null;
    paymentProcessor?: string | null;
    creditCard?: {
      token?: string | null;
      brand?: string | null;
      number?: string | null;
    };
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'pages';
        value: number | Page;
      } | null)
    | ({
        relationTo: 'events';
        value: number | Event;
      } | null)
    | ({
        relationTo: 'resources';
        value: number | Resource;
      } | null)
    | ({
        relationTo: 'avatars';
        value: number | Avatar;
      } | null)
    | ({
        relationTo: 'cards';
        value: number | Card;
      } | null)
    | ({
        relationTo: 'landscapes';
        value: number | Landscape;
      } | null)
    | ({
        relationTo: 'portraits';
        value: number | Portrait;
      } | null)
    | ({
        relationTo: 'meta-images';
        value: number | MetaImage;
      } | null)
    | ({
        relationTo: 'files';
        value: number | File;
      } | null)
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'redirects';
        value: number | Redirect;
      } | null)
    | ({
        relationTo: 'forms';
        value: number | Form;
      } | null)
    | ({
        relationTo: 'form-submissions';
        value: number | FormSubmission;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header".
 */
export interface Header {
  id: number;
  navItems?:
    | {
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?:
            | ({
                relationTo: 'pages';
                value: number | Page;
              } | null)
            | ({
                relationTo: 'files';
                value: number | File;
              } | null);
          url?: string | null;
          label: string;
        };
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer".
 */
export interface Footer {
  id: number;
  pageLinks?:
    | {
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?:
            | ({
                relationTo: 'pages';
                value: number | Page;
              } | null)
            | ({
                relationTo: 'files';
                value: number | File;
              } | null);
          url?: string | null;
          label: string;
        };
        id?: string | null;
      }[]
    | null;
  showContact?: boolean | null;
  showGoogleMap?: boolean | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "company-info".
 */
export interface CompanyInfo {
  id: number;
  contact?: {
    phone?: string | null;
    fax?: string | null;
    address?: string | null;
    googleMapLink?: string | null;
    email?: string | null;
  };
  social?:
    | {
        platform?: string | null;
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?:
            | ({
                relationTo: 'pages';
                value: number | Page;
              } | null)
            | ({
                relationTo: 'files';
                value: number | File;
              } | null);
          url?: string | null;
          label: string;
        };
        id?: string | null;
      }[]
    | null;
  hours?:
    | {
        type?: ('default' | 'custom') | null;
        day?: string | null;
        hours?: string | null;
        note?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}