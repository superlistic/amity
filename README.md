# Amity incorporated

todo-backend:

X register 
- simple matchmaking
- simple scheduling

todo:

- "401 Unauthorized (RFC 7235)
  Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided. **The response must include a WWW-Authenticate header field containing a challenge applicable to the requested resource.** See Basic access authentication and Digest access authentication. 401 semantically means "unauthorised", the user does not have valid authentication credentials for the target resource.
  Note: Some sites incorrectly issue HTTP 401 when an IP address is banned from the website (usually the website domain) and that specific address is refused permission to access a website" /wikipedia

---

## todo:

- logo
- name
- user story
- figma wireframe
- bussiness case
- set up CI/CD
- dev server

---

combating isolation and lonliness

## ideas

- inter company teambuilding
  - company wide topics
- social training
- conversation starters floating up besides the chat/video window

## MVP

### features (ranked)

- voice 'n' text (must)
- random ppl (must)
- video
- user accounts
- friends
- visibility settings

### wont do features

-???

## Keep in mind

- abuse/blocking
  - "why did you block?"

## stack

- react
- redux
- (next?)
- mongoDB (can concurrency be an issue)
- login (ideas)
  - oauth
  - own salt+hash pw
  - google/fb/other
  - https://auth0.com/

### what to store?

- history of connections
- user specific history

# DUMP

- landing page
- login
- account settings
- find connection
- friends online
- your org/team/crew
- schedule
- when/what/who preferences
- chat/connection page

# Workflow

- share code
- share responsibility
- separate keyboards

# GOOGLE LOGIN object

<!-- Gw {Ca: "116254110803571501768", wc: {…}, tt: Iw, googleId: "116254110803571501768", tokenObj: {…}, …}
Ca: "116254110803571501768"
accessToken: "ya29.a0AfH6SMCJN4uEWHJke5wzI-PNRm3Es4xgw_aj0h-MMEeaqy2JhtfKW9gA6uYsbWyG_8RWg1mfLeO6KpBBlPIKVJDkEmtVX_lKbJfF0DBc0YBkX079PUiFwzYkquzw8sg0YaWtHpt_kGpRwY2DKUMalgnrijfagEWXTDFRb062laA"
googleId: "116254110803571501768"
profileObj:
email: "ville_245@hotmail.com"
familyName: "Norman"
givenName: "Viktor"
googleId: "116254110803571501768"
imageUrl: "https://lh3.googleusercontent.com/a-/AOh14GgwwVMxhu2OqknQhXYcL4V3csWQHudeF7nb8bI0Zg=s96-c"
name: "Viktor Norman"
__proto__: Object
tokenId: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImRlZGMwMTJkMDdmNTJhZWRmZDVmOTc3ODRlMWJjYmUyM2MxOTcyNGQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDg4NjczODE3Mzg5LWEzcmk5bHIyYzZyMTlxcmUxbGgxbWE5MHJraGVndmlmLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDg4NjczODE3Mzg5LWEzcmk5bHIyYzZyMTlxcmUxbGgxbWE5MHJraGVndmlmLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE2MjU0MTEwODAzNTcxNTAxNzY4IiwiZW1haWwiOiJ2aWxsZV8yNDVAaG90bWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IlJzZ1dpRkYxZi1yTnhJRVJVc1ZyYkEiLCJuYW1lIjoiVmlrdG9yIE5vcm1hbiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHZ3d3Vk14aHUyT3FrblFoWFljTDRWM2NzV1FIdWRlRjduYjhiSTBaZz1zOTYtYyIsImdpdmVuX25hbWUiOiJWaWt0b3IiLCJmYW1pbHlfbmFtZSI6Ik5vcm1hbiIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjA1NzEwMzM0LCJleHAiOjE2MDU3MTM5MzQsImp0aSI6IjExMzM2MjYyMTA2MDgzNWFhMTZiZWQ2YTZiZTgwMjhlZWViODQ2ZTcifQ.Hv2EB03eKhD_sidjbenMRAlHniKAof4cW_Gh_uurxPQU2rc56vkTNZcZvqm7En6pQbkszCHVHbU_MDyA8Ea_3JGtnujz1fp2p9Wa1XN7fowcuV8_CHV6hveg4E6aBR0d6aOnhhRyAqZfHw94ujJsEkiHfmX8fsKh3rpF79DDG4t9ZncRTKi9EolwAkk2_cXQD8CF7CklFKP0leQNjPjfz-XxO75cejPo-iqUf6b7cNuE_Jb4Cb_spwJ-Gdf4Ym2X68zIikt6g0Sby0gp210DIH37OEY3hlI05clwypW4UizItOJZRTiDtaGzAZTFio_QqxChtxSf4WWyCl8O0A5ARQ"
tokenObj: {token_type: "Bearer", access_token: "ya29.a0AfH6SMCJN4uEWHJke5wzI-PNRm3Es4xgw_aj0h-MMEe…zw8sg0YaWtHpt_kGpRwY2DKUMalgnrijfagEWXTDFRb062laA", scope: "email profile openid https://www.googleapis.com/au…le https://www.googleapis.com/auth/userinfo.email", login_hint: "AJDLj6J9nXGC8nvyinFBHbJdEwBhg3zNczG_UeWGNncQ_G5zGDfZblzS0OzYDsnk-_32hZAB985cBnmAYqd71219o15w72upyg", expires_in: 3599, …}
tt: Iw {CT: "116254110803571501768", Ad: "Viktor Norman", gV: "Viktor", jT: "Norman", OJ: "https://lh3.googleusercontent.com/a-/AOh14GgwwVMxhu2OqknQhXYcL4V3csWQHudeF7nb8bI0Zg=s96-c", …}
wc: {token_type: "Bearer", access_token: "ya29.a0AfH6SMCJN4uEWHJke5wzI-PNRm3Es4xgw_aj0h-MMEe…zw8sg0YaWtHpt_kGpRwY2DKUMalgnrijfagEWXTDFRb062laA", scope: "email profile openid https://www.googleapis.com/au…le https://www.googleapis.com/auth/userinfo.email", login_hint: "AJDLj6J9nXGC8nvyinFBHbJdEwBhg3zNczG_UeWGNncQ_G5zGDfZblzS0OzYDsnk-_32hZAB985cBnmAYqd71219o15w72upyg", expires_in: 3599, …}
__proto__: Object -->

# FB LOGIN object

<!-- {name: "Viktor Norman", email: "ville_245@hotmail.com", picture: {…}, id: "10159203318599345", accessToken: "EAAEDToFfLHQBAEZBwcs11Y4BSGfi6poZCTdC2kOmu7qwaxfvk…rQKpQ8whP447KCxytC8CCyuZCD25wEjJPrGVsiqJv7eBU7MZD", …}
accessToken: "EAAEDToFfLHQBAEZBwcs11Y4BSGfi6poZCTdC2kOmu7qwaxfvkZCG8L8o97cDJpSvMgtHYaYcjmJT4t7rmlKZAlXJWGeWJYyLnP6vl3iFx69z1NPewUVlBUWgmQgaasnkeFZA4BwZAsGs4sAEXKIrQKpQ8whP447KCxytC8CCyuZCD25wEjJPrGVsiqJv7eBU7MZD"
data_access_expiration_time: 1613486318
email: "ville_245@hotmail.com"
expiresIn: 4882
graphDomain: "facebook"
id: "10159203318599345"
name: "Viktor Norman"
picture: {data: {…}}
signedRequest: "9K1yrt_jxWqcq4LmhRe50yLUbXmw1DV1Am5j_wu8n8M.eyJ1c2VyX2lkIjoiMTAxNTkyMDMzMTg1OTkzNDUiLCJjb2RlIjoiQVFDYXhRSUlwc3FIN2Z6NUo0VThJejNzOGlHWEV4SXZnX1dYd2pYbEdIUnZUeHM1Q18yRzB0S1FJRUQxazBTSkxWYUFmSjJPM2dxcnJmcF9ja3hSZDlxOU9VT3hYQXZZbU1XZlc0TTdOWjRkbzJKbjNWODhkZHUtQW4yXzBjbHFxN3dqR1JNWnp0UkJYN3FMYmw3ZURZNWlNa2pnVHlZTWtHZzl3aHlwdmZpTWtLTUZFSThLLXo0Q0NTSFNTM1ZKUUJiVG9uT0w1WFlEMzIxZmcxNjJKVFVjWGpjdnpGSmN1b2Z0aWhjRnRSYVhtaGVlS3RGWkt0aUNjeThPNXB1a1hka0ZNWmVfdXFnc1ZWTFRhNTg4VWN6MTFmcUNJbjl0eUUwVDV3LTJjSEhpUWNQc1ZkRHpKU0lhOUJFZEFzaFFKdjU4ZlhwR2ktajRySnAweVBFLTNDcEciLCJvYXV0aF90b2tlbiI6IkVBQUVEVG9GZkxIUUJBRVpCd2NzMTFZNEJTR2ZpNnBvWkNUZEMya09tdTdxd2F4ZnZrWkNHOEw4bzk3Y0RKcFN2TWd0SFlhWWNqbUpUNHQ3cm1sS1pBbFhKV0dlV0pZeUxuUDZ2bDNpRng2OXoxTlBld1VWbEJVV2dtUWdhYXNua2VGWkE0QndaQXNHczRzQUVYS0lyUUtwUTh3aFA0NDdLQ3h5dEM4Q0N5dVpDRDI1d0VqSlByR1ZzaXFKdjdlQlU3TVpEIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE2MDU3MTAzMTh9"
userID: "10159203318599345"
__proto__: Object -->
