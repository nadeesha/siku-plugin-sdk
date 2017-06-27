import * as _ from 'lodash';
import * as moment from 'moment';

export interface IUtils {
    get: <TResponse>(url: string, headers: any) => Promise<TResponse>;
    post: <TResponse>(url: string, headers: any, body: any) => Promise<TResponse>;
    _: typeof _,
    moment: typeof moment,
}

export interface IPluginConfig {
    redirectUrl: string;
    clientId: string;
    clientSecret: string;
}

export interface IEvent {
    id: string;
    timestamp: number;
    type: string;
    multiplier: number;
}

export interface IPluginDefinition<PluginUserConfig extends {}> {
    getAuthorizationUrl: () => Promise<string>;
    getAccessToken: <AuthResponse extends {}>(authResponse: AuthResponse) => Promise<string>;
    editUserConfig: () => Promise<PluginUserConfig>;
    getEvents: () => Promise<IEvent[]>;
    eventTypes: {
        [key:string]: {
            description: string;
        };
    };
}

export type PluginGenerator<PluginUserConfig> = (utils: IUtils, pluginConfig: IPluginConfig, userConfig: PluginUserConfig) => IPluginDefinition<PluginUserConfig>;
