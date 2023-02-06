// Copyright 2023 Paion Data. All rights reserved.
import React from "react";

import styles from "./Login.module.css";

interface LoginProps {
  backgroundUrl: string;
}

Login.defaultProps = {
  backgroundUrl: ''
};

const Login = (props: LoginProps): JSX.Element => {
 return (
  <div className={styles.login} style={{backgroundImage: backgroundUrl}}>
    <div className="login-sd">
      <div class="d-flex mb-5">
        <div class="login-logo">
          <v-avatar tile="tile" size="34">
            <v-img :src="logoUrl"></v-img>
          </v-avatar>
        </div>
        <div class="login-title">
          <div class="text-h6 grey--text text--darken-4">{{ siteTitle }}</div>
        </div>
      </div>
      <v-alert class="mb-0" v-model="errorShown" transition="slide-y-reverse-transition" color="red darken-2" tile="tile" dark="dark" dense="dense" icon="mdi-alert">
        <div class="body-2">{{errorMessage}}</div>
      </v-alert>
      <template v-if="screen === `login` &amp;&amp; strategies.length &gt; 1">
        <div class="login-subtitle">
          <div class="text-subtitle-1">{{$t('auth:selectAuthProvider')}}</div>
        </div>
        <div class="login-list">
          <v-list class="elevation-1 radius-7" nav="nav" light="light">
            <v-list-item-group v-model="selectedStrategyKey">
              <v-list-item v-for="(stg, idx) of filteredStrategies" :key="stg.key" :value="stg.key" :color="stg.strategy.color">
                <v-avatar class="mr-3" tile="tile" size="24" v-html="stg.strategy.icon"></v-avatar><span class="text-none">{{stg.displayName}}</span>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </div>
      </template>
      <template v-if="screen === `login` &amp;&amp; selectedStrategy.strategy.useForm">
        <div class="login-subtitle">
          <div class="text-subtitle-1">{{$t('auth:enterCredentials')}}</div>
        </div>
        <div class="login-form">
          <v-text-field solo="solo" flat="flat" prepend-inner-icon="mdi-clipboard-account" background-color="white" color="blue darken-2" hide-details="hide-details" ref="iptEmail" v-model="username" :placeholder="isUsernameEmail ? $t(`auth:fields.email`) : $t(`auth:fields.username`)" :type="isUsernameEmail ? `email` : `text`" :autocomplete="isUsernameEmail ? `email` : `username`" light="light"></v-text-field>
          <v-text-field class="mt-2" solo="solo" flat="flat" prepend-inner-icon="mdi-form-textbox-password" background-color="white" color="blue darken-2" hide-details="hide-details" ref="iptPassword" v-model="password" :append-icon="hidePassword ? &quot;mdi-eye-off&quot; : &quot;mdi-eye&quot;" @click:append="() =&gt; (hidePassword = !hidePassword)" :type="hidePassword ? &quot;password&quot; : &quot;text&quot;" :placeholder="$t(&quot;auth:fields.password&quot;)" autocomplete="current-password" @keyup.enter="login" light="light"></v-text-field>
          <v-btn class="mt-2 text-none" width="100%" large="large" color="blue darken-2" dark="dark" @click="login" :loading="isLoading">{{ $t('auth:actions.login') }}</v-btn>
          <div class="text-center mt-5">
            <v-btn class="text-none" text="text" rounded="rounded" color="grey darken-3" @click.stop.prevent="forgotPassword" href="#forgot">
              <div class="caption">{{ $t('auth:forgotPasswordLink') }}</div>
            </v-btn>
            <v-btn class="text-none" v-if="selectedStrategyKey === `local` &amp;&amp; selectedStrategy.selfRegistration" color="indigo darken-2" text="text" rounded="rounded" href="/register">
              <div class="caption">{{ $t('auth:switchToRegister.link') }}</div>
            </v-btn>
          </div>
        </div>
      </template>
      <template v-if="screen === `forgot`">
        <div class="login-subtitle">
          <div class="text-subtitle-1">{{$t('auth:forgotPasswordTitle')}}</div>
        </div>
        <div class="login-info">{{ $t('auth:forgotPasswordSubtitle') }}</div>
        <div class="login-form">
          <v-text-field solo="solo" flat="flat" prepend-inner-icon="mdi-clipboard-account" background-color="white" color="blue darken-2" hide-details="hide-details" ref="iptForgotPwdEmail" v-model="username" :placeholder="$t(`auth:fields.email`)" type="email" autocomplete="email" light="light"></v-text-field>
          <v-btn class="mt-2 text-none" width="100%" large="large" color="blue darken-2" dark="dark" @click="forgotPasswordSubmit" :loading="isLoading">{{ $t('auth:sendResetPassword') }}</v-btn>
          <div class="text-center mt-5">
            <v-btn class="text-none" text="text" rounded="rounded" color="grey darken-3" @click.stop.prevent="screen = `login`" href="#forgot">
              <div class="caption">{{ $t('auth:forgotPasswordCancel') }}</div>
            </v-btn>
          </div>
        </div>
      </template>
      <template v-if="screen === `changePwd`">
        <div class="login-subtitle">
          <div class="text-subtitle-1">{{ $t('auth:changePwd.subtitle') }}</div>
        </div>
        <div class="login-form">
          <v-text-field class="mt-2" type="password" solo="solo" flat="flat" prepend-inner-icon="mdi-form-textbox-password" background-color="white" color="blue darken-2" hide-details="hide-details" ref="iptNewPassword" v-model="newPassword" :placeholder="$t(`auth:changePwd.newPasswordPlaceholder`)" autocomplete="new-password" light="light">
            <password-strength slot="progress" v-model="newPassword"></password-strength>
          </v-text-field>
          <v-text-field class="mt-2" type="password" solo="solo" flat="flat" prepend-inner-icon="mdi-form-textbox-password" background-color="white" color="blue darken-2" hide-details="hide-details" v-model="newPasswordVerify" :placeholder="$t(`auth:changePwd.newPasswordVerifyPlaceholder`)" autocomplete="new-password" @keyup.enter="changePassword" light="light"></v-text-field>
          <v-btn class="mt-2 text-none" width="100%" large="large" color="blue darken-2" dark="dark" @click="changePassword" :loading="isLoading">{{ $t('auth:changePwd.proceed') }}</v-btn>
        </div>
      </template>
    </div>
  </div>
  <v-dialog v-model="isTFAShown" max-width="500" persistent="persistent">
    <v-card>
      <div class="login-tfa text-center pa-5 grey--text text--darken-3"><img src="_assets/svg/icon-pin-pad.svg"/>
        <div class="subtitle-2">{{$t('auth:tfaFormTitle')}}</div>
        <v-text-field class="login-tfa-field mt-2" solo="solo" flat="flat" background-color="white" color="blue darken-2" hide-details="hide-details" ref="iptTFA" v-model="securityCode" :placeholder="$t(&quot;auth:tfa.placeholder&quot;)" autocomplete="one-time-code" @keyup.enter="verifySecurityCode(false)" light="light"></v-text-field>
        <v-btn class="mt-2 text-none" width="100%" large="large" color="blue darken-2" dark="dark" @click="verifySecurityCode(false)" :loading="isLoading">{{ $t('auth:tfa.verifyToken') }}</v-btn>
      </div>
    </v-card>
  </v-dialog>
  <v-dialog v-model="isTFASetupShown" max-width="600" persistent="persistent">
    <v-card>
      <div class="login-tfa text-center pa-5 grey--text text--darken-3">
        <div class="subtitle-1 primary--text">{{$t('auth:tfaSetupTitle')}}</div>
        <v-divider class="my-5"></v-divider>
        <div class="subtitle-2">{{$t('auth:tfaSetupInstrFirst')}}</div>
        <div class="caption">(<a href="https://authy.com/" target="_blank" noopener="noopener">Authy</a>, <a href="https://support.google.com/accounts/answer/1066447" target="_blank" noopener="noopener">Google Authenticator</a>, <a href="https://www.microsoft.com/en-us/account/authenticator" target="_blank" noopener="noopener">Microsoft Authenticator</a>, etc.)</div>
        <div class="login-tfa-qr mt-5" v-if="isTFASetupShown" v-html="tfaQRImage"></div>
        <div class="subtitle-2 mt-5">{{$t('auth:tfaSetupInstrSecond')}}</div>
        <v-text-field class="login-tfa-field mt-2" solo="solo" flat="flat" background-color="white" color="blue darken-2" hide-details="hide-details" ref="iptTFASetup" v-model="securityCode" :placeholder="$t(&quot;auth:tfa.placeholder&quot;)" autocomplete="one-time-code" @keyup.enter="verifySecurityCode(true)" light="light"></v-text-field>
        <v-btn class="mt-2 text-none" width="100%" large="large" color="blue darken-2" dark="dark" @click="verifySecurityCode(true)" :loading="isLoading">{{ $t('auth:tfa.verifyToken') }}</v-btn>
      </div>
    </v-card>
  </v-dialog>
  <loader v-model="isLoading" :color="loaderColor" :title="loaderTitle" :subtitle="$t(`auth:pleaseWait`)"></loader>
  <notify style="padding-top: 64px;"></notify>
 );
};

export default Login;