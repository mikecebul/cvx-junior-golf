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
      image?: (string | null) | Media;
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
    media: Media;
    users: User;
    forms: Form;
    'form-submissions': FormSubmission;
    redirects: Redirect;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    pages: PagesSelect<false> | PagesSelect<true>;
    events: EventsSelect<false> | EventsSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    forms: FormsSelect<false> | FormsSelect<true>;
    'form-submissions': FormSubmissionsSelect<false> | FormSubmissionsSelect<true>;
    redirects: RedirectsSelect<false> | RedirectsSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    header: Header;
    footer: Footer;
    'company-info': CompanyInfo;
  };
  globalsSelect: {
    header: HeaderSelect<false> | HeaderSelect<true>;
    footer: FooterSelect<false> | FooterSelect<true>;
    'company-info': CompanyInfoSelect<false> | CompanyInfoSelect<true>;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
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
  id: string;
  title: string;
  layout: (
    | Hero
    | EventsBlock
    | HowItWorksBlock
    | HistoryBlock
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
      image?: (string | null) | Media;
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
                  value: string | Page;
                } | null)
              | ({
                  relationTo: 'media';
                  value: string | Media;
                } | null);
            url?: string | null;
            label: string;
            appearance?: ('default' | 'outline') | null;
          };
          id?: string | null;
        }[]
      | null;
    image: string | Media;
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
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
  caption?: string | null;
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
    meta?: {
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
  eventItems?: (string | Event)[] | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'events';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events".
 */
export interface Event {
  id: string;
  title: string;
  description: {
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
  };
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
                value: string | Page;
              } | null)
            | ({
                relationTo: 'media';
                value: string | Media;
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
  image?: (string | null) | Media;
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
          value: string | Page;
        } | null)
      | ({
          relationTo: 'media';
          value: string | Media;
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
          value: string | Page;
        } | null)
      | ({
          relationTo: 'media';
          value: string | Media;
        } | null);
    url?: string | null;
    label: string;
    appearance?: ('default' | 'outline') | null;
  };
  image?: (string | null) | Media;
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
  images?: (string | Media)[] | null;
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
 * via the `definition` "EventsPageBlock".
 */
export interface EventsPageBlock {
  title?: string | null;
  events?: (string | Event)[] | null;
  announcements?:
    | {
        title: string;
        description: {
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
        };
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
  form: string | Form;
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
  id?: string | null;
  blockName?: string | null;
  blockType: 'formBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "forms".
 */
export interface Form {
  id: string;
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
        | {
            name: string;
            labelSingular: string;
            labelPlural: string;
            width?: number | null;
            minRows: number;
            maxRows: number;
            fields?:
              | (
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
                      required?: boolean | null;
                      id?: string | null;
                      blockName?: string | null;
                      blockType: 'email';
                    }
                )[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'array';
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
 * via the `definition` "users".
 */
export interface User {
  id: string;
  name?: string | null;
  role: string;
  updatedAt: string;
  createdAt: string;
  enableAPIKey?: boolean | null;
  apiKey?: string | null;
  apiKeyIndex?: string | null;
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
 * via the `definition` "form-submissions".
 */
export interface FormSubmission {
  id: string;
  formData:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  price: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
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
 * via the `definition` "redirects".
 */
export interface Redirect {
  id: string;
  from: string;
  to?: {
    type?: ('reference' | 'custom') | null;
    reference?: {
      relationTo: 'pages';
      value: string | Page;
    } | null;
    url?: string | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'pages';
        value: string | Page;
      } | null)
    | ({
        relationTo: 'events';
        value: string | Event;
      } | null)
    | ({
        relationTo: 'media';
        value: string | Media;
      } | null)
    | ({
        relationTo: 'users';
        value: string | User;
      } | null)
    | ({
        relationTo: 'forms';
        value: string | Form;
      } | null)
    | ({
        relationTo: 'form-submissions';
        value: string | FormSubmission;
      } | null)
    | ({
        relationTo: 'redirects';
        value: string | Redirect;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
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
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  title?: T;
  layout?:
    | T
    | {
        hero?:
          | T
          | {
              type?: T;
              highImpact?:
                | T
                | {
                    title?: T;
                    description?: T;
                    links?:
                      | T
                      | {
                          link?:
                            | T
                            | {
                                type?: T;
                                newTab?: T;
                                reference?: T;
                                url?: T;
                                label?: T;
                                appearance?: T;
                              };
                          id?: T;
                        };
                    image?: T;
                  };
              mediumImpact?:
                | T
                | {
                    subtitle?: T;
                    title?: T;
                    description?: T;
                  };
              id?: T;
              blockName?: T;
            };
        events?:
          | T
          | {
              title?: T;
              description?: T;
              eventItems?: T;
              id?: T;
              blockName?: T;
            };
        howItWorks?:
          | T
          | {
              title?: T;
              description?: T;
              links?:
                | T
                | {
                    link?:
                      | T
                      | {
                          type?: T;
                          newTab?: T;
                          reference?: T;
                          url?: T;
                          label?: T;
                          appearance?: T;
                        };
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
        history?:
          | T
          | {
              title?: T;
              description?: T;
              image?: T;
              items?:
                | T
                | {
                    title?: T;
                    description?: T;
                    id?: T;
                  };
              link?:
                | T
                | {
                    type?: T;
                    newTab?: T;
                    reference?: T;
                    url?: T;
                    label?: T;
                    appearance?: T;
                  };
              id?: T;
              blockName?: T;
            };
        donate?:
          | T
          | {
              title?: T;
              description?: T;
              link?:
                | T
                | {
                    type?: T;
                    newTab?: T;
                    reference?: T;
                    url?: T;
                    label?: T;
                    appearance?: T;
                  };
              image?: T;
              id?: T;
              blockName?: T;
            };
        richText?:
          | T
          | {
              subtitle?: T;
              richContent?: T;
              images?: T;
              id?: T;
              blockName?: T;
            };
        linksBlock?:
          | T
          | {
              hero?:
                | T
                | {
                    hero?:
                      | T
                      | {
                          type?: T;
                          highImpact?:
                            | T
                            | {
                                title?: T;
                                description?: T;
                                links?:
                                  | T
                                  | {
                                      link?:
                                        | T
                                        | {
                                            type?: T;
                                            newTab?: T;
                                            reference?: T;
                                            url?: T;
                                            label?: T;
                                            appearance?: T;
                                          };
                                      id?: T;
                                    };
                                image?: T;
                              };
                          mediumImpact?:
                            | T
                            | {
                                subtitle?: T;
                                title?: T;
                                description?: T;
                              };
                          id?: T;
                          blockName?: T;
                        };
                  };
              linkCards?:
                | T
                | {
                    linkType?: T;
                    title?: T;
                    description?: T;
                    imageUploadOption?: T;
                    keywords?: T;
                    image?: T;
                    href?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
        eventsPage?:
          | T
          | {
              title?: T;
              events?: T;
              announcements?:
                | T
                | {
                    title?: T;
                    description?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
        formBlock?:
          | T
          | {
              form?: T;
              enableIntro?: T;
              introContent?: T;
              id?: T;
              blockName?: T;
            };
      };
  meta?:
    | T
    | {
        hideFromSearchEngines?: T;
        metadata?:
          | T
          | {
              overview?: T;
              title?: T;
              image?: T;
              description?: T;
              preview?: T;
            };
      };
  publishedAt?: T;
  slug?: T;
  slugLock?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events_select".
 */
export interface EventsSelect<T extends boolean = true> {
  title?: T;
  description?: T;
  date?: T;
  location?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  caption?: T;
  prefix?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
  sizes?:
    | T
    | {
        thumbnail?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        meta?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  name?: T;
  role?: T;
  updatedAt?: T;
  createdAt?: T;
  enableAPIKey?: T;
  apiKey?: T;
  apiKeyIndex?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "forms_select".
 */
export interface FormsSelect<T extends boolean = true> {
  title?: T;
  fields?:
    | T
    | {
        checkbox?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              required?: T;
              defaultValue?: T;
              id?: T;
              blockName?: T;
            };
        country?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              required?: T;
              id?: T;
              blockName?: T;
            };
        email?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              required?: T;
              id?: T;
              blockName?: T;
            };
        message?:
          | T
          | {
              message?: T;
              id?: T;
              blockName?: T;
            };
        number?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              defaultValue?: T;
              required?: T;
              id?: T;
              blockName?: T;
            };
        payment?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              basePrice?: T;
              priceConditions?:
                | T
                | {
                    fieldToUse?: T;
                    condition?: T;
                    valueForCondition?: T;
                    operator?: T;
                    valueType?: T;
                    valueForOperator?: T;
                    id?: T;
                  };
              required?: T;
              id?: T;
              blockName?: T;
            };
        select?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              defaultValue?: T;
              options?:
                | T
                | {
                    label?: T;
                    value?: T;
                    id?: T;
                  };
              required?: T;
              id?: T;
              blockName?: T;
            };
        state?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              required?: T;
              id?: T;
              blockName?: T;
            };
        text?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              defaultValue?: T;
              required?: T;
              id?: T;
              blockName?: T;
            };
        textarea?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              defaultValue?: T;
              required?: T;
              id?: T;
              blockName?: T;
            };
        array?:
          | T
          | {
              name?: T;
              labelSingular?: T;
              labelPlural?: T;
              width?: T;
              minRows?: T;
              maxRows?: T;
              fields?:
                | T
                | {
                    text?:
                      | T
                      | {
                          name?: T;
                          label?: T;
                          width?: T;
                          defaultValue?: T;
                          required?: T;
                          id?: T;
                          blockName?: T;
                        };
                    email?:
                      | T
                      | {
                          name?: T;
                          label?: T;
                          width?: T;
                          required?: T;
                          id?: T;
                          blockName?: T;
                        };
                  };
              id?: T;
              blockName?: T;
            };
      };
  submitButtonLabel?: T;
  confirmationType?: T;
  confirmationMessage?: T;
  redirect?:
    | T
    | {
        url?: T;
      };
  emails?:
    | T
    | {
        emailTo?: T;
        cc?: T;
        bcc?: T;
        replyTo?: T;
        emailFrom?: T;
        subject?: T;
        message?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "form-submissions_select".
 */
export interface FormSubmissionsSelect<T extends boolean = true> {
  formData?: T;
  price?: T;
  paymentStatus?: T;
  payment?:
    | T
    | {
        field?: T;
        status?: T;
        amount?: T;
        paymentProcessor?: T;
        creditCard?:
          | T
          | {
              token?: T;
              brand?: T;
              number?: T;
            };
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "redirects_select".
 */
export interface RedirectsSelect<T extends boolean = true> {
  from?: T;
  to?:
    | T
    | {
        type?: T;
        reference?: T;
        url?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header".
 */
export interface Header {
  id: string;
  navItems?:
    | {
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?:
            | ({
                relationTo: 'pages';
                value: string | Page;
              } | null)
            | ({
                relationTo: 'media';
                value: string | Media;
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
  id: string;
  pageLinks?:
    | {
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?:
            | ({
                relationTo: 'pages';
                value: string | Page;
              } | null)
            | ({
                relationTo: 'media';
                value: string | Media;
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
  id: string;
  contact: {
    physicalAddress: {
      address: string;
      googleMapLink?: string | null;
    };
    mailingAddress: {
      address: string;
      googleMapLink?: string | null;
    };
    phone?: string | null;
    fax?: string | null;
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
                value: string | Page;
              } | null)
            | ({
                relationTo: 'media';
                value: string | Media;
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
 * via the `definition` "header_select".
 */
export interface HeaderSelect<T extends boolean = true> {
  navItems?:
    | T
    | {
        link?:
          | T
          | {
              type?: T;
              newTab?: T;
              reference?: T;
              url?: T;
              label?: T;
            };
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer_select".
 */
export interface FooterSelect<T extends boolean = true> {
  pageLinks?:
    | T
    | {
        link?:
          | T
          | {
              type?: T;
              newTab?: T;
              reference?: T;
              url?: T;
              label?: T;
            };
        id?: T;
      };
  showContact?: T;
  showGoogleMap?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "company-info_select".
 */
export interface CompanyInfoSelect<T extends boolean = true> {
  contact?:
    | T
    | {
        physicalAddress?:
          | T
          | {
              address?: T;
              googleMapLink?: T;
            };
        mailingAddress?:
          | T
          | {
              address?: T;
              googleMapLink?: T;
            };
        phone?: T;
        fax?: T;
        email?: T;
      };
  social?:
    | T
    | {
        platform?: T;
        link?:
          | T
          | {
              type?: T;
              newTab?: T;
              reference?: T;
              url?: T;
              label?: T;
            };
        id?: T;
      };
  hours?:
    | T
    | {
        type?: T;
        day?: T;
        hours?: T;
        note?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "MediaBlock".
 */
export interface MediaBlock {
  position?: ('default' | 'fullscreen') | null;
  media: string | Media;
  id?: string | null;
  blockName?: string | null;
  blockType: 'mediaBlock';
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