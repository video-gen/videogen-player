import "@mux/mux-player";

const VG_PLAY_PREFIX = "vg_play_";

const VIDEOGEN_LOGO_SVG = `<svg width="20" height="15" viewBox="0 0 101 76" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M75.6113 22.3958L95.2988 11.302C95.8018 10.9729 96.3823 10.7815 96.9819 10.7468C97.582 10.7119 98.1807 10.8352 98.7183 11.104C99.2559 11.3726 99.7134 11.7776 100.045 12.2786C100.378 12.7793 100.573 13.3584 100.611 13.9583V62.6145C100.578 63.217 100.387 63.8 100.057 64.3049C99.7266 64.8101 99.269 65.2192 98.731 65.4917C98.1924 65.7639 97.5918 65.8899 96.9893 65.8567C96.3872 65.8232 95.8037 65.6321 95.2988 65.302L75.6113 54.2083V69.5833C75.6113 71.241 74.9526 72.8306 73.7808 74.0027C72.6084 75.1748 71.019 75.8333 69.3613 75.8333H13.1113C9.7959 75.8333 6.6167 74.5164 4.27246 72.1721C1.92822 69.8279 0.611328 66.6484 0.611328 63.3333V13.3333C0.611328 10.0181 1.92822 6.83862 4.27246 4.49438C6.6167 2.15015 9.7959 0.833252 13.1113 0.833252H69.3613C71.019 0.833252 72.6084 1.4917 73.7808 2.66382C74.9526 3.83594 75.6113 5.42554 75.6113 7.08325V22.3958ZM38.0039 18L37.6191 18.0232L37.6152 18.0269C36.9243 18.1208 36.29 18.4622 35.8315 18.9875C35.3726 19.5129 35.1191 20.187 35.1191 20.8845V23.7654L21.6577 23.7693C20.521 23.7688 19.395 23.9922 18.3447 24.4268C17.2944 24.8616 16.3398 25.4988 15.5361 26.3025C14.7319 27.1062 14.0942 28.0603 13.6592 29.1106C13.2241 30.1606 13 31.2864 13 32.4231V49.7461C13 52.0413 13.9116 54.2424 15.5347 55.8652C17.1577 57.4883 19.3589 58.3999 21.6538 58.3999H54.3462C56.6411 58.3999 58.8423 57.4883 60.4653 55.8652C62.0884 54.2424 63 52.0413 63 49.7461V32.4192C63 30.124 62.0884 27.9229 60.4653 26.3C58.8423 24.6772 56.6411 23.7654 54.3462 23.7654H40.8848L40.8887 20.8845L40.8613 20.4922C40.7666 19.8018 40.4253 19.1687 39.8999 18.7107C39.3745 18.2524 38.7007 18 38.0039 18ZM27.4482 35.6167C28.0537 35.387 28.6992 35.2817 29.3462 35.3076C30.5869 35.3574 31.7603 35.8853 32.6206 36.7808C33.481 37.676 33.9614 38.8696 33.9614 40.1116C33.9614 41.3533 33.481 42.5469 32.6206 43.4424C31.7603 44.3379 30.5869 44.8657 29.3462 44.9153C28.6992 44.9412 28.0537 44.8362 27.4482 44.6064C26.8428 44.3767 26.29 44.0271 25.8232 43.5784C25.356 43.1299 24.9844 42.5913 24.731 41.9956C24.4771 41.3999 24.3462 40.759 24.3462 40.1116C24.3462 39.4641 24.4771 38.8232 24.731 38.2273C24.9844 37.6316 25.356 37.0933 25.8232 36.6448C26.29 36.196 26.8428 35.8464 27.4482 35.6167ZM44.729 35.6167C45.3345 35.387 45.98 35.2817 46.627 35.3076C47.8677 35.3574 49.041 35.8853 49.9014 36.7808C50.7617 37.676 51.2422 38.8696 51.2422 40.1116C51.2422 41.3533 50.7617 42.5469 49.9014 43.4424C49.041 44.3379 47.8677 44.8657 46.627 44.9153C46.2637 44.9299 45.9009 44.9031 45.5454 44.8362C45.2676 44.7839 44.9946 44.7073 44.729 44.6064C44.1235 44.3767 43.5708 44.0271 43.104 43.5784C42.8379 43.3228 42.6025 43.0378 42.4023 42.7297C42.2515 42.4973 42.1206 42.2517 42.0117 41.9956C41.7578 41.3999 41.627 40.759 41.627 40.1116C41.627 39.4641 41.7578 38.8232 42.0117 38.2273C42.2651 37.6316 42.6367 37.0933 43.104 36.6448C43.5708 36.196 44.1235 35.8464 44.729 35.6167Z" fill="white"/></svg>`;

/**
 * Decode a `vg_play_<base64url>` public playback ID back to
 * the raw Mux playback ID.
 */
export function decodePublicPlaybackId(encodedId: string): string {
  if (!encodedId.startsWith(VG_PLAY_PREFIX)) {
    throw new Error(
      `Invalid public playback ID: expected "${VG_PLAY_PREFIX}" prefix, got "${encodedId.slice(0, 10)}..."`,
    );
  }

  const base64url = encodedId.slice(VG_PLAY_PREFIX.length);
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");

  return atob(base64);
}

export interface VideoGenPlayerConfig {
  /** Encoded public playback ID from the VideoGen API (`vg_play_...`). */
  publicPlaybackId: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  /** Poster image URL shown before playback starts. */
  poster?: string;
  /** Time in seconds to use as the poster frame. */
  thumbnailTime?: number;
  /** Time in seconds to start playback from. */
  startTime?: number;
}

const VIDEOGEN_ACCENT_COLOR = "#6c5ce7";

/**
 * Create and configure a VideoGen player element with enforced branding.
 * Attaches to the given container element.
 */
export function createVideoGenPlayer(
  container: HTMLElement,
  config: VideoGenPlayerConfig,
): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";
  wrapper.style.display = "inline-block";
  wrapper.style.width = "100%";
  wrapper.style.overflow = "hidden";

  const muxPlayer = document.createElement("mux-player") as HTMLElement;

  const muxPlaybackId = decodePublicPlaybackId(config.publicPlaybackId);
  muxPlayer.setAttribute("playback-id", muxPlaybackId);
  muxPlayer.setAttribute("accent-color", VIDEOGEN_ACCENT_COLOR);

  if (config.autoplay) muxPlayer.setAttribute("autoplay", "");
  if (config.muted) muxPlayer.setAttribute("muted", "");
  if (config.loop) muxPlayer.setAttribute("loop", "");
  if (config.poster) muxPlayer.setAttribute("poster", config.poster);
  if (config.thumbnailTime != null)
    muxPlayer.setAttribute("thumbnail-time", String(config.thumbnailTime));
  if (config.startTime != null)
    muxPlayer.setAttribute("start-time", String(config.startTime));

  const logo = document.createElement("a");
  logo.href = "https://videogen.io";
  logo.target = "_blank";
  logo.rel = "noopener noreferrer";
  logo.innerHTML = VIDEOGEN_LOGO_SVG;
  logo.style.position = "absolute";
  logo.style.bottom = "12px";
  logo.style.right = "12px";
  logo.style.opacity = "0.8";
  logo.style.zIndex = "10";
  logo.style.lineHeight = "0";

  wrapper.appendChild(muxPlayer);
  wrapper.appendChild(logo);
  container.appendChild(wrapper);
  return wrapper;
}
