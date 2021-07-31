import { Octokit } from '@octokit/rest'
import axios from 'axios'
import { getUserDetailsByGithub } from '../services/user.service'
import { config } from '../config/config'
import { GithubUserData } from '../types/githubUserData'
import { generateCustomToken } from './firebase'

export const getGithubAccessToken = async (code: string): Promise<string> => {
  try {
    const data = (
      await axios.get('https://github.com/login/oauth/access_token', {
        params: {
          client_id: config.GITHUB_VSCODE_CLIENT_ID,
          client_secret: config.GITHUB_VSCODE_CLIENT_SECRET,
          code: code,
        },
      })
    ).data

    const re = new RegExp('access_token=(.+)&scope', 'gi')
    const extractToken = re.exec(data)[1] ?? ''

    return Promise.resolve(extractToken)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getGitHubUserDetails = async (accessToken: string): Promise<GithubUserData> => {
  try {
    const octokit = new Octokit({
      auth: accessToken,
    })

    const result = await octokit.rest.users.getAuthenticated()
    const resultData = result.data as GithubUserData
    return Promise.resolve(resultData)
  } catch (err) {
    console.error('error getGitHubUserDetails', err)
    return Promise.reject(err)
  }
}

export const createGithubCustomToken = async (githubCode: string): Promise<{ code: string; uid: string }> => {
  try {
    const accessToken = await getGithubAccessToken(githubCode)
    const githubData = await getGitHubUserDetails(accessToken)
    const githubUsername = githubData.login
    const userDoc = await getUserDetailsByGithub(githubUsername)
    const userUid = userDoc.uid
    const generatedToken = await generateCustomToken(userUid)

    return Promise.resolve({
      code: generatedToken,
      uid: userUid,
    })
  } catch (err) {
    console.error('error createGithubCustomToken', err)
    return Promise.reject(err)
  }
}
