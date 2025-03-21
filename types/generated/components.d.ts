import type { Schema, Struct } from '@strapi/strapi';

export interface LinksSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_links_social_links';
  info: {
    displayName: 'Social Link';
  };
  attributes: {
    iconClass: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedVideo extends Struct.ComponentSchema {
  collectionName: 'components_shared_videos';
  info: {
    description: 'Video embed component';
    displayName: 'Video';
    icon: 'play';
  };
  attributes: {
    caption: Schema.Attribute.String;
    height: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1080>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1920>;
  };
}

export interface SharedVideoContent extends Struct.ComponentSchema {
  collectionName: 'components_shared_video_contents';
  info: {
    description: 'Video content component';
    displayName: 'Video Content';
    icon: 'play';
  };
  attributes: {
    caption: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    video: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<'plugin::video-field.video'>;
  };
}

export interface SharedVideoSize extends Struct.ComponentSchema {
  collectionName: 'components_shared_video_sizes';
  info: {
    description: 'Video embed size settings';
    displayName: 'Video Size';
    icon: 'expand';
  };
  attributes: {
    height: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 2160;
          min: 240;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1080>;
    responsive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    width: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 3840;
          min: 320;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1920>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'links.social-link': LinksSocialLink;
      'shared.video': SharedVideo;
      'shared.video-content': SharedVideoContent;
      'shared.video-size': SharedVideoSize;
    }
  }
}
